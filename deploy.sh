#!/bin/sh
sudo cp "./sketch2Code.sketchplugin" ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
echo "sketch2Code.sketchplugin deployed"

sudo cp "./Common.snippet" ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
echo "Common.snippet deployed"

sudo cp "./UITableViewCell.snippet" ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
echo "UITableViewCell.snippet deployed"

sudo cp "./view.map" ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
echo "view.map deployed"

# osascript -e 'tell application "Sketch" to keystroke "p" using {control down, shift down}'
