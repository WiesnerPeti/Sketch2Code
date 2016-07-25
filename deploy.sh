#!/bin/sh

echo "I need to write to ~/Library/Application\ Support"

pluginFiles=(
	"sketch2Code.sketchplugin"
	"render-core.js"
	"runtime.js"
	"io.js"
	"common.js"
	"logger.js"
	"Editor.sketchplugin"
	"Common.snippet"
	"UITableViewCell.snippet"
	"UIView.snippet"
	"view.map"
	)

for file in "${pluginFiles[@]}";
do
  filePath="./$file"
  sudo cp -f $filePath ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
  echo "$file deployed"
done

consoleQueryFiles=(
	"EditorPlugin.aslquery"
	"Sketch2CodePlugin.aslquery"
	)

for file in "${consoleQueryFiles[@]}";
do
  filePath="./$file"
  sudo cp -f $filePath ~/Library/Application\ Support/Console/ASLQueries
  echo "$file deployed"
done
