import openpyxl
import enum
import heapq

class countyMap(enum.IntEnum):
    FullName=0
    CountyID=1
    Arts=2
    Crime=3
    Environment=4
    Over65=5
    Unemployment=6
    CostofLiving=7
    Educated=8
    PopGrowth=9
    Income=10
    Poverty=11



class county:
    def __init__(self, valueArray):
        self.value_array=valueArray;
        self.score = 0

    def set_score(self, weightArray):

        for i in range(len(countyMap), 2):
            self.score+= self.value_array[i] * weightArray[i]


    #sort order is reversed to easily accomidate python's max heap
    def __lt__(self, other):
        return self.score < other.score
    def __gt__(self, other):
        return self.score > other.score
    def  __ge__(self, other):
        return self.score >= other.score
    def __le__(self, other):
        return self.score <= other.score



def bestCountries(spreadsheet_name, preference_array):
    workbook= openpyxl.load_workbook(spreadsheet_name)
    worksheet= workbook["Sheet1"]

    topCountiesHeap = []

    for row in worksheet.iter_rows():
        temp_county= county([cell.value for cell in row])
        temp_county.set_score(preference_array)

        heapq.heappush(topCountiesHeap, temp_county)
        topCountiesHeap = heapq.nsmallest(10, topCountiesHeap)

    return [county[:1] for county in sorted(topCountiesHeap)]




def main():
    go=0

if __name__ == '__main__':
    main()
