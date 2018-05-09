import openpyxl
import enum
import heapq


# an enumerated type that holds the index of each statistic
class countyMap(enum.IntEnum):
    FullName = 0
    CountyID = 1
    Arts = 2
    Crime = 3
    Environment = 4
    Over65 = 5
    Unemployment = 6
    CostofLiving = 7
    Educated = 8
    PopGrowth = 9
    Income = 10
    Poverty = 11


class county:
    def __init__(self, valueArray):
        self.value_array = valueArray;
        self.score = 0

    def set_score(self, weightArray):
        for i in range(2, len(countyMap)):
            self.score += self.value_array[i] * weightArray[i]

    # sort order is reversed to easily accomidate python's max heap
    def __lt__(self, other):
        return self.score < other.score

    def __gt__(self, other):
        return self.score > other.score

    def __ge__(self, other):
        return self.score >= other.score

    def __le__(self, other):
        return self.score <= other.score


# this function will process all the counties immediately, including a penalty for
def bestCounties_immediate(spreadsheet_name, preference_array):
    workbook = openpyxl.load_workbook(spreadsheet_name)
    worksheet = workbook["Sheet1"]

    topCountiesHeap = []

    row_num = 1

    for row in worksheet.iter_rows():
        # this cuts out the non data rows
        if row_num < 7:
            pass
        # county data
        elif int(row[countyMap.CountyID].value) % 100 != 0:
            print()

            temp_county = county([cell.value for cell in row])
            temp_county.set_score(preference_array)

            heapq.heappush(topCountiesHeap, temp_county)
            topCountiesHeap = heapq.nsmallest(10, topCountiesHeap)

        row_num += 1

    return [county.value_array[:1] for county in sorted(topCountiesHeap)]


# this class will allow us to feed in all the counties beforehand to avoid file io
class best_county_persist:
    placeholder = 0


def main():
    go = 0


if __name__ == '__main__':
    a = [2] * len(countyMap)
    print(bestCounties_immediate("census_selected_data.xlsx", a))
