#!/bin/sh
sudo cp -f "./sketch2Code.sketchplugin" ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
echo "sketch2Code.sketchplugin deployed"

sudo cp -f "./Common.snippet" ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
echo "Common.snippet deployed"

sudo cp -f "./UITableViewCell.snippet" ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
echo "UITableViewCell.snippet deployed"

sudo cp -f "./view.map" ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
echo "view.map deployed"
