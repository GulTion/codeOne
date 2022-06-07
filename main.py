class Student:
    def __init__(self, orig=None):
        if orig is None:
            self.non_copy_constructor()
        else:
            self.copy_constructor(orig)

    def say(self):
        print(self.name)


s1 = Student("G Ulshan")
s1.say()
s2 = Student(s1)
s2.say()
