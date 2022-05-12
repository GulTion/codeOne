# 24hours in day
# 1 hours 20rs
# 2 hours 40rs
# 5hours 100rs
# after 5hours there is unlimited



def hours2Bill(h):
    total = 0
    while(h>0):
        if(h<=0.5):
            h -= 0.5
            total+=10
        else:
            if(h<5):
                total +=20
                h-=1
            else:
                h = 0
                total += 100

    return total

print(hours2Bill(3.5))
