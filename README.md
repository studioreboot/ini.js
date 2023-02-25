# ini.js

*an INI parser in JavaScript*

# How to use:

The INI namespace provided when installed has four functions:

```
parse
removeComment
parseValue
build
```

# INI namespace:

The ***"parse"*** function takes in a string.
(string being the actual INI file itself)
Returning a object which you can traverse yourself.

The ***"removeComment"*** function takes in a string.
This filters out any commments on a line.
Returns the filtered line.

The ***"parseValue"*** function takes in a string.
This will try to check if the given string can be turned into a number/boolean.
If it cannot be turned into a number/boolean it will return the value given.
Returns number/boolean/string.

The ***"build"*** function takes in a object.
This will be turned into a INI file.
Returns a string that is the INI file that was built.
