//
//  Contains methods to operate on the JavasCript-Objective-C runtime
//

@import "./common.js"
@import "./logger.js"

//Returns the plain dictionary representation of the object
function objectAsDictionary(object)
{
    if([object isKindOfClass:[NSDictionary class]])
    {
        var serializedDictionary = getValueFromDictionary(object)]
        return serializedDictionary
    }

    var dict = [NSMutableDictionary new]

    var properties = [[[object class] mocha] propertiesWithAncestors];

    for(var i = 0; i < properties.count(); i++)
    {
        var property = properties[i]
        var propName = [property name]

        if(isExcludedPropertyName(propName))
        {
            continue;
        }

        var getterMethod = [MOMethod methodWithTarget:object selector:propName)]

        try {

          var value = getterMethod()

          // custom_log(propName + " - " + value + " - " + typeof value)

          if(value == nil)
          {
            continue;
          }

          if(typeof value == 'object' && ([propName rangeOfString:"class"].location == NSNotFound))
          {
             value = getValue(value)
          }

          if(typeof value != 'object' || isJSONReady(value))
          {
              dict[propName] = value
          }
        } catch (e) {
          custom_log(e)
        }
    }

    custom_log(dict)

    return dict;
}

function getValue(value)
{
      if([value isKindOfClass:[NSArray class]])
      {
          // return getValueFromArray(value);
      }
      else if(isJSONReady(value))
      {
          return value;
      }
      else if([value isKindOfClass:[NSDictionary class]])
      {
          // return getValueFromDictionary(value);
      }
      else if(value)
      {
          // return  objectAsDictionary(value);
      }

      return nil;
}

function getValueFromDictionary(dictionary)
{
    var serializableDictionary = [NSMutableDictionary new];
    enumerateDict(dict, function(key, value){

        var serializedValue = getValue(value);

        if(serializedValue)
        {
            serializableDictionary[key] = serializedValue;
        }
    })
    
    return serializableDictionary;
}

function getValueFromArray(array)
{
    var serializableArray = [NSMutableArray new];

    enumerateArray(array, function(item){

      var serializableValue = getValue(item);

        if(serializableValue)
        {
            [serializableArray addObject:serializableValue];
        }

    })

    return serializableArray;
}

function isExcludedPropertyName(name)
{
  var array = [NSArray arrayWithObjects:"transformStruct",nil]
  return [array containsObject:name]
}

function isJSONReady(value)
{
    return [value isKindOfClass:[NSString class]] || [value isKindOfClass:[NSNumber class]] || (typeof value == "number");
}