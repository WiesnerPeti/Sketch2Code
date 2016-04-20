# Sketch2Code
Let's turn Sketch files into code

Goal: Create a customizable Sketch plugin that converts a selected layer to a UIKit view

Co-author and creator of a similar, just works plugin: @csacsi

## Steps
(See sketch2Code.sketchplugin file)

1. Retrieve the selected item in the Sketch file
2. Ask the user for a file path
3. Load the helper descriptors:
	1. view.map: Tells which Sketch class should be matched to which UIKit class
	2. Common.snippet: Tells how a basic (UI) element should be created, which classes should be imported. If the element needs binding for its init, the a _bindings_ map is provided. Each item in this map tells how the value for a binding should be retrieved from the Sketch object. Each description is a JS code, that has the Sketch object in form of a dictionary as input. This JS code will genereate the binding value.
	3. UITableViewCell.snippet: A hard-coded snippet for now, tells how the final interface and implementation file look like.
4. Go through the children of the selected item, for every shild:
	1. Create the interface declaration
	2. Create the init code
	3. Create the config code (set the properties to customize the view)
	4. Create the add to superview code
	5. Create the layout code
5. Write the interface and implementation file to the given file path


:large_orange_diamond: :soon: :page_with_curl:
