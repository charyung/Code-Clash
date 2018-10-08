### WARNING, THIS WHOLE PROGRAM ASSUMES THERE ARE NO SYNTAX ERRORS
### AND THAT THE FILE IS PEP8 COMPLIANT
import sys

# this is the name of a function or method without a name


class EmptyName(str):
    def __str__(self):
        return "main"

    def __int__(self):
        return 0
NO_NAME = EmptyName()


def get_name(line: str):
    # loop until the name of the thing
    line = line.lstrip(" ")
    c = 0
    while line[c] != " ":
        c += 1
    c += 1
    name = ""

    # get the thing
    while line[c].isalnum():
        name += line[c]
        c += 1
    return name


def create_class_dict(filename: str):
    """
    Creates a dictionary which can be accessed by dict[classname][methodname]
    currently does not work for object oriented code
    :param filename:
    :return:
    """
    file = [""]
    with open(filename) as the_thing:
        file = the_thing.readlines();
    file = [line.rstrip() for line in file]

    # Get the methods
    classes = dict()
    classes[NO_NAME] = {NO_NAME: []} # methods[class][method].append(line) to add a newline

    curr_class = NO_NAME   # keeps track of current class
    curr_method = NO_NAME  # current method

    for line in file:
        if len(line) > 6 and line[0:5] == "class": # is a class
            curr_class = get_name(line)
            curr_method = NO_NAME
            classes[curr_class] = {NO_NAME: []}

        elif len(line.lstrip(" ")) > 4 and line.lstrip(" ")[0:3] == "def":  # is a method or function
            if line[0] != " ":  # if it is a top level function
                curr_class = NO_NAME
            curr_method = get_name(line)
            classes[curr_class][curr_method] = []

        else:
            if not line or (not line[0].isspace() and line[0] != "#"):  # if the class or method has ended
                curr_method = NO_NAME
                curr_class = NO_NAME
            classes[curr_class][curr_method].append(line)

    return classes


def print_classes(classes: dict):
    for class_name in classes:
        print("class " + str(class_name) + ": ")
        for method in classes[class_name]:
            if classes[class_name][method]:
                print("method " + str(method) + ": ")
                [print(classes[class_name][method][i]) for i in range(len(classes[class_name][method]))]
                print(); print()


def get_dependencies(file_name, method_name):
    """ Gets the functions and all relevant dependencies """
    d = create_class_dict(file_name)[NO_NAME]

    assert method_name in d

    names = [i for i in d]
    dependencies = []
    for f in names:
        for line in d[method_name]:
            if (f + "(") in line or ((f + " ") in line):
                dependencies.append(f)
                break

    return dependencies[1:]  # [1:] in order to get rid of the global code


def print_dependencies(file_name, method_name):
    """ Return as a string the given function with all its dependencies """
    d = create_class_dict(file_name)[NO_NAME]

    assert method_name in d

    dependencies = get_dependencies(file_name, method_name)
    out = "function " + method_name + ":\n" + "\n".join(d[method_name]) + "\n"
    for k in dependencies:
        out += "\nfunction " + k + ":\n"
        out += "\n".join(d[k]) + "\n\n"
    return out



if __name__ == "__main__":
    d = create_class_dict("functions.py")
    print_classes(d)
    main_methods = [i for i in d[NO_NAME]]
    print(main_methods)
    print("----------------")
    print(get_dependencies("functions.py", "func4"))
    print(get_dependencies("functions.py", "func5"))
    print(get_dependencies("functions.py", "func6"))
    print("----------------")
    print(print_dependencies("functions.py", "func6"))
