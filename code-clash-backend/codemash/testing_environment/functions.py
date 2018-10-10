# This is a comment
# this is some high level code

2 + 2 == 4
4 - 1 == 3

print("quick maths")

def func1():
    """ docstring and some code later """
    print("Hello, World!")

def func2():
    " docstring and some code later "
    print("Hello, World!2")

def func3(k):
    " docstring and some code later "
    print("Hello, World!2")

def func4():
    " docstring and some code later "
    print("Hello, World!2")

def func5(k):
    " docstring and some code later "
    print("Hello, World!2")
    func4()

def func6():
    " docstring and some code later "
    k = func1()
    func2()
    k = (func3(k))
    func5()

