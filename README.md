# Sketch2Code
Let's turn Sketch files into code
:large_orange_diamond: :soon: :page_with_curl:

##Goal
Create a customizable Sketch plugin that converts a selected layer to a UIKit file with Objective-C code.

##Install
Run the `deploy.sh` script as sudo (Sketch plugins are under the User's Library folder). This script will copy all the plugins and helper files.

##Build and run
Run the `run.sh` script as sudo (same reason). This script will run a `deploy.sh`, clear the Console, bring Sketch to focus and execute the plugins shortcut.

##Testing
You can use the `Template.sketch` file to play with the plugin and the `Sketch2CodeTest` Xcode project to see the view in an iOS environment.

## Algorithm
(See sketch2Code.sketchplugin file)

1. Store the currently selected item
2. Ask the user for a destination folder
3. Load the helper descriptors:
	1. `view.map`: Tells which Sketch class converted to which UIKit class
	2. `Common.snippet`: Tells how a basic (UI) element should be created.
	3. `UIView` and `UITableViewCell.snippet`: Tells how a custom UIView and UITableView file should look like.
4. Go through the children of the selected item, for every child:
	0. Assemble the interface and implementation files from the snippets
	1. Create the _iVar declaration_ section
	2. Create the _initialization_ section
	3. Create the _configuration_ section, where the view's necessary properties are set
	4. Create the _add to superview_ code
	5. Create the _layout_ code
5. Write the interface and implementation file to the given file path

##Contacts
@csacsi
@wiesnerpeti

##Development material
- Sketch Developer portal: http://developer.sketchapp.com/
- Sketch class-dump: https://github.com/ryngonzalez/Sketch-Internals
- Sketch plugin mailing list: http://sketchplugins.com/mailman/listinfo/dev_sketchplugins.com

Sketch is a constant evolving app, this means, that API the plugins can use also changes with it. It is worth to learn how to class-dump the Sketch app to keep up with the changes.