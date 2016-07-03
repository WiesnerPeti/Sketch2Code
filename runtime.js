//
//  Contains methods to operate on the JavasCript-Objective-C runtime
//

//Returns the plain dictionary representation of the object
function objectAsDictionary(object)
{
    if([object isKindOfClass:[NSDictionary class]])
    {
        var serializedDictionary = serializeDictionaryUsingDateFormatKey(object)]
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
             value = serializeValueUsingDateFormatKey(value)
          }

          if(typeof value != 'object' || isJSONReady(value))
          {
              dict[propName] = value
          }
        } catch (e) {

        }
    }

    custom_log(dict)

    return dict;
}

function serializeValueUsingDateFormatKey(value)
{
      if([value isKindOfClass:[NSArray class]])
      {
          // return serializeArrayUsingDateFormatKey(value);
      }
      else if(isJSONReady(value))
      {
          return value;
      }
      else if([value isKindOfClass:[NSDictionary class]])
      {
          // return serializeDictionaryUsingDateFormatKey(value);
      }
      else if(value)
      {
          // return  objectAsDictionary(value);
      }

      return nil;
}

function isJSONReady(value)
{
    return [value isKindOfClass:[NSString class]] || [value isKindOfClass:[NSNumber class]] || (typeof value == "number");
}

function serializeDictionaryUsingDateFormatKey(dictionary)
{
    var serializableDictionary = [NSMutableDictionary new];
    var loop = [[dictionary allKeys] objectEnumerator]
    while (dictKey = loop.nextObject()) {
        var dictValue = dictionary[dictKey]

        var serializedValue = serializeValueUsingDateFormatKey(dictValue);

        if(serializedValue)
        {
            serializableDictionary[dictKey] = serializedValue;
        }
    }

    return serializableDictionary;
}

function serializeArrayUsingDateFormatKey(array)
{
    var serializableArray = [NSMutableArray new];

    var loop = [array objectEnumerator]
    while (item = loop.nextObject())
    {
        var serializableValue = serializeValueUsingDateFormatKey(item);

        if(serializableValue)
        {
            [serializableArray addObject:serializableValue];
        }
    }

    return serializableArray;
}

function isExcludedPropertyName(name)
{
  var array = [NSArray arrayWithObjects:"transformStruct",nil]
  return [array containsObject:name]
}