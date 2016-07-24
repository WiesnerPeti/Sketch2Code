//
//  Contains the core render methods
//

@import "./common.js"

var layersToSave;
var templateParts;

function visitLayerHandler(target)
{
    if([target isMemberOfClass:[MSLayerGroup class]])
    {
        custom_log("Converting:" + target)
        convertTarget(target)
        visitLayerInGroup(target, visitLayerHandler)
    }
}

function convertTarget(target)
{
  var targetSnippetName = mappedClassNameForLayer(target) || "UIView"
  var targetTemplates = loadSnippet(targetSnippetName)

  custom_log("Assembling snippet")

  var interfaceContent = interfaceCode(targetTemplates)
  var implementationContent = implementationCode(targetTemplates)

  custom_log("Replacing template tags")

  layersToSave = [NSMutableArray new];
  templateParts = templateBinding(target);

  interfaceContent = templateCodeWithDictionary(interfaceContent, templateParts)
  implementationContent = templateCodeWithDictionary(implementationContent, templateParts)

  custom_log("Writing files")

  writeTextToFile(baseDir + "/" + [target name] + ".h", interfaceContent)
  writeTextToFile(baseDir + "/" + [target name] + ".m", implementationContent)

  custom_log("Writing files [Done]")
}

//Generates the "empty" header code with bindings in it
function interfaceCode(snippet)
{
    var headerSnippetPart = snippet[@"header"]

    return renderItems([NSArray arrayWithObjects:headerSnippetPart[@"imports"],
                       headerSnippetPart[@"interface_tag"]])
}

//Generates the "empty" implementation code with bindings in it
function implementationCode(snippet)
{
    var implementationSnippetPart = snippet[@"implementation"]

    return renderItems([NSArray arrayWithObjects:implementationSnippetPart[@"imports"],
                       implementationSnippetPart[@"implementation_tag"][0],
                       implementationSnippetPart[@"create"],
                       implementationSnippetPart[@"layout"],
                       implementationSnippetPart[@"implementation_tag"][1]]])
}

//Takes the file template (either header or implementation) and replaces the bindings in it
function templateBinding(target)
{
    var template = [NSMutableDictionary dictionary]

    template[@"<CLASS_NAME>"] = [target name]

    custom_log("Collecting iVars and layout")
    var iVars = [NSMutableArray array]
    var inits = [NSMutableArray array]
    var addSubviews = [NSMutableArray array]
    var layouts = [NSMutableArray array]
    var allLayers = [NSMutableArray array]

    visitLayerInGroup(target, function(layer){

      var layerName = [layer name]
      var layerClass = NSStringFromClass([layer class])
      var viewClass = mappedClassNameForLayer(layer)

      if(viewClass != nil)
      {
          var viewDesc = viewDescriptors[viewClass]

          custom_log("Layer:" + layerClass + " name:" + layerName + " layerClass:" + viewClass + " viewDesc:" + viewDesc)

          var iVarString = iVarDeclaration(viewClass, layerName)
          [iVars addObject:"\t" + iVarString]

          var initString = initDefinition(layer, layerName, viewDesc);
          [inits addObject:"\t" + initString]

          var addSubviewString = addSubviewDefinition(layerName);
          [addSubviews addObject:"\t" + addSubviewString]

          var layoutString = layoutDefinition(layer, layerName)
          [layouts addObject:"\t" + layoutString]
      }

      [allLayers addObject:layer]

      //Set the layer hidden for exporting
      [layer setIsVisible:false]

    })

    //Make the real export
    enumerateArray(layersToSave, function(layer){

      [layer setIsVisible:true]

      var layerName = [layer name]
      var layerClass = NSStringFromClass([layer class])
      var viewClass = mappedClassNameForLayer(layer)
      var viewDesc = viewDescriptors[viewClass]
      exportImageToFile(baseDir + "/" +  layerName, layer, viewDesc["export"]["format"])

      [layer setIsVisible:false]

    })

    enumerateArray(allLayers, function(layer){

      //Set back all of the layer visibilities
      [layer setIsVisible:true]

    })


    template[@"<SUBVIEW_DECLARATION>"] = renderItems(iVars)
    template[@"<SUBVIEW_INIT>"] = renderItems(inits)
    template[@"<SUBVIEW_ADD>"] = renderItems(addSubviews)
    template[@"<SUBVIEW_LAYOUT>"] = renderItems(layouts)

    return template
}

//Generates the command lines for variable declaration
function iVarDeclaration(className, varName)
{
  return className + " *" + iVarName(varName) + ";"
}

//Generates the initialisation command lines for a layer
function initDefinition(layer, varName, viewDesc)
{
    var createString = viewDesc["create"]["template"]
    var initString = [NSString stringWithString:iVarName(varName) + " " + "=" + " " + createString + ";"]

    // objectAsDictionary(layer)

    //resolve init bindings
    if(viewDesc["create"]["bindings"])
    {
      var layerAsDict = objectAsDictionary(layer)
      enumerateDict(viewDesc["create"]["bindings"], function(binding, code){
          var templateValue = evalBindigCode(code, layerAsDict)
          initString = [initString stringByReplacingOccurrencesOfString:binding withString:templateValue]
      })
    }

    //Export if needed
    if(viewDesc["export"])
    {
        [layersToSave addObject:layer]
    }

    //Config
    var propertyMap = viewDesc["properties"]
    if(propertyMap != nil)
    {
      var configString = configStringDefinitions(layer, varName, propertyMap)
      initString = renderItems([NSArray arrayWithObjects:initString, configString, nil])
    }

    return initString
}

//Generates the command lines to customize the layer
function configStringDefinitions(layer, varName, propertiesMap)
{
    var config = [NSMutableArray array]

    enumerateDict(propertiesMap, function(propertyName, sketchPropertyName){

      var value = [layer valueForKeyPath:sketchPropertyName]

      custom_log("ValyeForKeyPath :" + sketchPropertyName + " " + value)

      if(value == nil)
      {
        return
      }

      var valueClass = NSStringFromClass([value class])

      if(valueClass == nil)
      {
          return
      }

      custom_log("Value class :" + valueClass + " key:" + key)

      var configString = nil
      var viewClass = classMapping[valueClass]
      var viewDesc = viewDescriptors[viewClass]
      var createTemplate = viewDesc[@"create"][@"template"]
      var valueAsDictionary = objectAsDictionary(value)

      enumerateDict(viewDesc[@"create"][@"bindings"], function(binding,code){

        var valueObj = evalBindigCode(code, valueAsDictionary)

        custom_log("Binding: " + binding + " value: " + valueObj)

        createTemplate = [createTemplate stringByReplacingOccurrencesOfString:binding withString:valueObj]
      })

      configString = "\t" + iVarName(varName) + "." + propertyName + " = " + createTemplate + ";"

      [config addObject:configString]
    });

    return renderItems(config)
}

//Generates the command lines to join the view hierarchy
function addSubviewDefinition(varName)
{
    var addSubview = "self" + " " + "addSubview:" + iVarName(varName)
    return messageSendText(addSubview) + ";"
}

//Generates the layouting command lines for the given layer and name
function layoutDefinition(layer, varName)
{
    var userInfo = [layer userInfo]

    var viewClass = mappedClassNameForLayer(layer)
    var viewDesc = viewDescriptors[viewClass]
    var layoutCode = viewDesc[@"layout"][@"template"]
	var layoutArguments = {}

    if(userInfo != nil && userInfo["com.bouchenoiremarc.sketch-constraints"] != nil)
    {
      var constraintString = userInfo["com.bouchenoiremarc.sketch-constraints"]["@constraints"]
      var constraintJSON = dataToJSONObject([constraintString dataUsingEncoding:NSUTF8StringEncoding])

      custom_log("Constraints for " + varName + " : " + constraintJSON)

      var alignVertical = constraintJSON["vertically"]
      var alignHorizontal = constraintJSON["horizontaly"]
      var leftMargin = constraintJSON["left"] || 0
      var rightMargin = constraintJSON["right"] || 0
      var topMargin = constraintJSON["top"] || 0
      var bottomMargin = constraintJSON["bottom"] || 0

      //TODO: This should be customizable
      var x = Math.ceil(layer.frame().x()), y = Math.ceil(layer.frame().y()),width = Math.ceil(layer.frame().width()), height = Math.ceil(layer.frame().height());

      if(alignVertical)
      {
          y = "self.bounds.size.height/2.0" + " - " + height + "/2.0"
      }
      else
      {
          if(bottomMargin > 0)
          {
              y = "self.bounds.size.width" + " - " + bottomMargin
          }
          else
          {
              y = topMargin
          }
      }

      if(alignHorizontal)
      {
          x = "self.bounds.size.width/2.0" + " - " + width + "/2.0"
      }
      else
      {
        if(rightMargin > 0)
        {
          x = "self.bounds.size.width" + " - " + rightMargin + " - " + width
        }
        else
        {
          x = leftMargin
        }
      }

      layoutArguments = {
	      	"name" : iVarName(varName),
	      	"x" : x,
	      	"y" : y,
	      	"width" : width,
	      	"height" : height
      }
    }
    else
    {
    	layoutArguments = {
	      	"name" : iVarName(varName),
	      	"x" : Math.ceil(layer.frame().x()),
	      	"y" : Math.ceil(layer.frame().y()),
	      	"width" : Math.ceil(layer.frame().width()),
	      	"height" : Math.ceil(layer.frame().height())
      	}
    }

    enumerateDict(viewDesc["layout"]["bindings"], function(binding, code){
          var templateValue = evalBindigCode(code, layoutArguments)
          layoutCode = [layoutCode stringByReplacingOccurrencesOfString:binding withString:templateValue]
      })

    return layoutCode + ";"
}

function messageSendText(text)
{
  return "[" + text + "]"
}

function iVarName(varName)
{
  if (!generatedNamesCache[varName])
  {
    var sanitizedVarName = [varName stringByReplacingOccurrencesOfString:" " withString:""]
    generatedNamesCache[varName] = "_" + sanitizedVarName;
  }

  return generatedNamesCache[varName];
}

function renderItems(items)
{
  var separator = @"\n"
  return renderItemsWithSeparator(items, separator)
}

//Renders the lines with the given separator
function renderItemsWithSeparator(items, separator)
{
  var renderedString = @""
  var loop = [items objectEnumerator]

  while(item = [loop nextObject])
  {
      if([item isKindOfClass:[NSArray class]])
      {
          renderedString = renderedString + [item componentsJoinedByString:separator]
      }
      else
      {
          renderedString = renderedString + item
      }

      renderedString = renderedString + separator
  }

  return renderedString
}

//Enumerates on the children of the layer group
function visitLayerInGroup(targetGroup, block)
{
  enumerateArray([targetGroup children], function(layer){

      if(layer == targetGroup)
      {
        return;
      }
      block(layer)
  })
}

//Replaces the bindings defined in dictionary in the tempate string
function templateCodeWithDictionary(template, dictionary)
{
   var loop = [[dictionary allKeys] objectEnumerator]

   var finalString = template

   while(binding = [loop nextObject])
   {
      var re = new RegExp(binding, 'g');
      finalString = finalString.replace(re, dictionary[binding]);
   }

   return finalString
}

//Gets the UIKit class name for the Sketch object
function mappedClassNameForLayer(layer)
{
  var userInfo = [layer userInfo]
  var layerClass = NSStringFromClass([layer class]);
  var className = classMapping[layerClass]

  if(!userInfo)
  {
      return className
  }

  var customViewClassName = userInfo["Sketch2Code.viewClass"]

  if(!customViewClassName)
  {
      return className;
  }

  custom_log("Custom className found: " + customViewClassName)

  return customViewClassName
}

//Evaluates the JS code written for the bindings
function evalBindigCode(scriptCode, scriptArguments)
{
    var errorPointer = MOPointer.alloc().initWithValue(nil)
    var parameterData = [NSJSONSerialization dataWithJSONObject:scriptArguments options:0 error:errorPointer]

    if(errorPointer.value())
    {
      custom_log("Error:" + errorPointer.value())
    }

    var parameterString = [[NSString alloc] initWithData:parameterData encoding:4]
    var script = "var f = function(dict){" + scriptCode +"}; f( " + parameterString + ")"

    var returnValue = [webView stringByEvaluatingJavaScriptFromString:script];

    return returnValue
}