//
//	Contains methods for common operations
//

function enumerateDict(dict, block)
{
  var loop = [[dict allKeys] objectEnumerator]
  while (key = loop.nextObject()) {
      var value = dict[key]

      block(key, value)
  }
}

function enumerateArray(array, block)
{
  var loop = [array objectEnumerator]
  while (item = loop.nextObject()) {
      block(item)
  }
}