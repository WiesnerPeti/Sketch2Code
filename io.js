//
//  Contains method for IO operations
//

// Loads the map dictionary, that can tell for which Sketch cass which UIkit belongs
function loadObjectMap()
{
    var path = pluginPath()

    path = [path stringByAppendingString:@"view.map"]

    custom_log("Loading map at:" + path)

    id map = loadJSON(path)

    custom_log("" + map)

    custom_log("Map loading [Done]")

    return map
}

//Loads a snippet-type json file
function loadSnippet(snippetName)
{
  var filePath = pluginPath();
  filePath = [filePath stringByAppendingString:snippetName]
  filePath = [filePath stringByAppendingString:@".snippet"]

  custom_log("Loading snippet: " + filePath)

  id snippet = loadJSON(filePath)

  custom_log("Snippet loaded[Done]")

  return snippet
}

////
//  COMMON (Should be in a separate file)
////

//General function to load a JSON from a filePath
function loadJSON(filePath)
{
  var errorPointer = MOPointer.alloc().initWithValue(nil)
  var data = [NSData dataWithContentsOfFile:filePath options:0 error:errorPointer]

  if(errorPointer.value())
  {
    custom_log("Error:" + errorPointer.value())
  }

  return dataToJSONObject(data)
}

//Converts NSData to JSON serialzed object
function dataToJSONObject(data)
{
  var errorPointer = MOPointer.alloc().initWithValue(nil)

  var json = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:errorPointer]

  if(errorPointer.value())
  {
    custom_log("Error:" + errorPointer.value())
  }

  return json
}

//Path to the plugins folder (to reach snippets and view mapping)
function pluginPath()
{
  var path = MSPluginManager.mainPluginsFolderURL();

  path = [path absoluteString]
  path = [path stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding]
  path = [path stringByReplacingOccurrencesOfString:@"file://" withString:@""]

  return path
}

function writeTextToFile(path, text)
{
     if (typeof path !== 'string')
         return false;

     var string = NSString.stringWithUTF8String(text);
     var errorPointer = MOPointer.alloc().initWithValue(nil)

     var result = [string writeToFile:path atomically:1 encoding:NSUTF8StringEncoding error:errorPointer];

     if(errorPointer.value())
     {
        custom_log("Error:" + errorPointer.value())
     }

     return result;
}

function exportImageToFile(path, layer, format)
{
    var finalPath = path + "." + format
    var rect = [layer absoluteDirtyRect]
    var slice = [MSExportRequest requestWithName:"ExportRequest" rect:rect]
    [slice setIncludeArtboardBackground:false];

    custom_log("Saving slice: "+slice+" to path: "+finalPath)

    [doc saveArtboardOrSlice:slice toFile:finalPath]
}