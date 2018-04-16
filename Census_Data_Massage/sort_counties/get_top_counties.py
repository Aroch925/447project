import openpyxl
import enum

class countyMap(enum.IntEnum):
    FullName=0
    CountyID=1
    Crime=2
    Over65=3
    Unemployment=4
    Population=5
    CostOfLiving=6
    Arts=7
    Educated=8
    Growth=9
    Income=10
    Poverty=11
    Area=12
    PopDensity=13
    Environment=14



class county:
    def __init__(self, valueArray):
        self.value_array=valueArray;

    def set_score(self, weightArray):
        self.score=0
        for i in range(len(countyMap), 2):
            self.score+= self.value_array[i] * weightArray[i]
    def __lt__(self, other):
        return self.score < other.score
    def __gt__(self, other):
        return self.score > other.score
    def  __ge__(self, other):
        return self.score >= other.score
    def __le__(self, other):
        return self.score <= other.score


def main():
    go=0

if __name__ == '__main__':
    main()
