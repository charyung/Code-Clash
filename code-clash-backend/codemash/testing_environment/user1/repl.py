import __hello__

"The docstring for the class"
class RandomClass:

    "Some random docstring"
    var = 52;

    """ The very complicated constructor
    that spans multiple lines
    """
    def __init__(self, var_val: int):
        self.var = var_val

    """blablabla"""
    def set_var(self, value):
        self.var = value

    """more blablabla"""
    def get_var(self):
        return self.var
