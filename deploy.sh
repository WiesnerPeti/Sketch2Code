#!/bin/sh

echo "I need to write to ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins"

for file in "sketch2Code.sketchplugin" "Editor.sketchplugin" "Common.snippet" "UITableViewCell.snippet" "view.map";
do
  filePath="./$file"
  sudo cp -f $filePath ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
  echo "$file deployed"
done
