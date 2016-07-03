#!/bin/sh

echo "I need to write to ~/Library/Application\ Support"

for file in "sketch2Code.sketchplugin" "runtime.js" "io.js" "common.js" "Editor.sketchplugin" "Common.snippet" "UITableViewCell.snippet" "UIView.snippet" "view.map";
do
  filePath="./$file"
  sudo cp -f $filePath ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
  echo "$file deployed"
done

for file in "EditorPlugin.aslquery" "Sketch2CodePlugin.aslquery";
do
  filePath="./$file"
  sudo cp -f $filePath ~/Library/Application\ Support/Console/ASLQueries
  echo "$file deployed"
done
