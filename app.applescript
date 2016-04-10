tell application "System Events"
  tell application "Console" to activate
  keystroke "k" using {command down}
  delay 0.1
  tell application "Sketch" to activate
  keystroke "p" using {shift down, control down}
end tell
