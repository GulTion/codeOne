def insertionSort(A):
    for j in range(2, len(A)):
        key = A[j]
        i = j-1
        while i>0 and A[i]>key:
            A[i+1]=A[i]
            i = i-1
        A[i+1]=key

    return A


a = [12, 23,45,53,43]

print(insertionSort(a))