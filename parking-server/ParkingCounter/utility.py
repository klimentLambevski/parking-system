import json
from SimpleCV import *
import datetime
import linecache
import sys
import requests
import shutil

path = os.path.dirname(os.path.realpath(__file__))

# START static variables
imageCheckFolderPath = "data" + os.altsep + "logs" + os.altsep + "parkingImagesCheck"
imgParkingLogPathCamera = path + os.altsep + "data" + os.altsep + "images" + os.altsep + "parkingLot.jpg"

# END static variables

def isParkingSpotEmpty(parkingImgWithEdges,points, parkingImg, name, threshold,
                       logImages):

    mask = Image((parkingImgWithEdges.width, parkingImgWithEdges.height))
    dl = DrawingLayer((parkingImgWithEdges.width, parkingImgWithEdges.height))

    # polygon around parking spot
    dl.polygon(points,
               filled=True, color=Color.WHITE)
    mask.addDrawingLayer(dl)
    mask = mask.applyLayers()

    # images taken to check
    imgSpotToCheck = parkingImgWithEdges - mask
    # substract original image with image with parking Spot colored in black
    # and we get just the parking spot cropped
    imgSpotToCheck = parkingImgWithEdges - imgSpotToCheck

    img_matrix_toCheck = imgSpotToCheck.getNumpy().flatten()
    img_pixel_count_toCheck = cv2.countNonZero(img_matrix_toCheck)

    parkingImgNew = parkingImg - mask
    parkingImgNew = parkingImg - parkingImgNew
    if logImages:
        # part after the first character "_" is pixel count of parking spot
        imgSpotToCheck.save(
            imageCheckFolderPath + os.altsep + "checkHasCarLines_" + str(
                name) + "_" + str(img_pixel_count_toCheck) + "_" + str(
                name) + ".jpg")
        parkingImgNew.save(
            imageCheckFolderPath + os.altsep + "checkHasCarOriginal_" + str(
                name) + "_" + str(img_pixel_count_toCheck) + "_" + ".jpg")

    if img_pixel_count_toCheck > threshold:
        return False
    else:
        return True

def loadJsonData(fileName):
    jason_data = NONE
    with open(fileName) as json_file:
        json_data = json.load(json_file)
        # print(json_data["parkingSpots"])
    return json_data

def logToTextFile(text):
    try:
        fo = open("data" + os.altsep + "logs" + os.altsep + "log.txt", "a+")
        fo.write(text + "___" + str(datetime.datetime.now()) + os.linesep)
        fo.close()
    except:
        fo = open("data" + os.altsep + "logs" + os.altsep + "log.txt", "a+")
        fo.write("Error while trying to save error log (logToTextFile())" + "___" + str(
            datetime.datetime.now()) + os.linesep)
        fo.close()

def writeDataJs(jsonData):
    fo = open("data" + os.altsep + "data.json", "w")
    fo.write(jsonData)
    fo.close()

def emptyDir(pathToDir):
    for root, dirs, files in os.walk(pathToDir, topdown=False):
        for name in files:
            os.remove(os.path.join(root, name))
        for name in dirs:
            os.rmdir(os.path.join(root, name))

def getException():
    exc_type, exc_obj, tb = sys.exc_info()
    f = tb.tb_frame
    lineno = tb.tb_lineno
    filename = f.f_code.co_filename
    linecache.checkcache(filename)
    line = linecache.getline(filename, lineno, f.f_globals)
    return 'EXCEPTION IN ({}, LINE {} "{}"): {}'.format(filename, lineno, line.strip(), exc_obj)

def takeImage():
    capture = cv2.VideoCapture(0)
    flag,imArray = capture.read()
    img = cv.fromarray(imArray)
    return Image(img)

def getImageFromRaspberry(baseUrl):
    try:
        # delete previous image
        os.remove("data/images/parkingLot.jpg")
    except:
        print ""
    #     comment the following three lines if you do not want the server to take new image
    response = requests.get(baseUrl+"/getImageUrl/", stream=True)
    if response.status_code != 200:
        return "getImageFromRaspberry()->getImageUrl error:"+str(response.status_code)

    response = requests.get(baseUrl+"/static/parkingLot.jpg", stream=True)
    if response.status_code != 200:
        return "getImageFromRaspberry()->http Image error:"+str(response.status_code)
    with open('data/images/parkingLot.jpg', 'wb') as out_file:
        shutil.copyfileobj(response.raw, out_file)
    del response
    return Image(imgParkingLogPathCamera)
    # with open('pic1.jpg', 'wb') as handle:
    #     response = requests.get(url, stream=True)
    #
    #     if not response.ok:
    #         print response
    #
    #     for block in response.iter_content(1024):
    #         if not block:
    #             break
    #
    #         handle.write(block)


    # urllib.urlretrieve(url, "local-filename.jpg")