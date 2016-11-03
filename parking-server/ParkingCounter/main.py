from SimpleCV import *
import utility
import json

# you can check the coordinates of the right top parking spot Here:http://www.maschek.hu/imagemap/imgmap
# START static variables
path = os.path.dirname(os.path.realpath(__file__))

imagesCheckFolderPath = path + os.altsep + "data" + os.altsep + "logs" + os.altsep + "parkingImagesCheck"
imgParkingLogPath = path + os.altsep + "data" + os.altsep + "images" + os.altsep + "parkingLot.jpg"
imgParkingLogPathCamera = path + os.altsep + "data" + os.altsep + "images" + os.altsep + "parkingLot.jpg"
parkingDataJsFilePath = path + os.altsep + "data" + os.altsep + "config" + os.altsep + "parkingData.json"
dataFileEmptyPS = path + os.altsep + "data" + os.altsep + "config" + os.altsep + "dataPSEmpty.json"
configDataJsFilePath = path + os.altsep + "data" + os.altsep + "config" + os.altsep + "config.json"

# END static variables
errorChecksum = ""  # any error will be appended to this variable
data = utility.loadJsonData(parkingDataJsFilePath)
config = utility.loadJsonData(configDataJsFilePath)

try:
    # if set to true. Images of checking the parking spots will be saved
    enableLogging = config["enableLogging"]
except:
    enableLogging = False
try:
    # if set to true. Image will be taken from camera
    useCamera = config["useCamera"]
except:
    # image: data/images/parkingLog.jpg will be used to determine free and taken parking places
    useCamera = False

try:
    baseUrlRaspberryPi = config['baseUrlRaspberryPi']
except:
    errorChecksum = "baseUrlRaspberryPi not Defined in Config.json"


# iterating all spots from json file dataParallel.json
def checkParkingSpotsFromJsonData(errorChecksum):
    if useCamera:
        image = utility.getImageFromRaspberry(baseUrlRaspberryPi)
        if enableLogging:
            image.save(imgParkingLogPath)
    else:
        image = Image(imgParkingLogPath)
        try:
            a = 1
            # uncomment to get image from raspberry pi
            # errorChecksum += utility.getImageFromRaspberry(baseUrlRaspberryPi)
        except Exception, e:
            utility.logToTextFile(utility.getException())
    if errorChecksum == "":
        image = Image(imgParkingLogPath)

        imgSpotToCheck = image.edges(25, 400)

    emptySpots = []
    counter = 0

    if not os.path.exists(imagesCheckFolderPath):
        os.mkdir(imagesCheckFolderPath)

    # remove images from previous check for empty parking spots
    utility.emptyDir(imagesCheckFolderPath)
    try:
        # init the min pixel count that represent car in parking spot
        threshold = config["threshold"]
    except:
        # default pixel count
        threshold = 2000

    if errorChecksum == "":
        # no error so far
        # Checking parking places from json file
        for parkingSpot in data["parkingSpots"]:
            spots = parkingSpot[str("spots")]
            points = []
            for pointJSObj in spots:
                points.append((pointJSObj[str("x")], pointJSObj[str("y")]))

            index = int(parkingSpot[str("index")])
            if utility.isParkingSpotEmpty(imgSpotToCheck, points, image,
                                          parkingSpot[str("name")], threshold, enableLogging):
                if enableLogging:
                    print "parking spot " + parkingSpot["name"] + " is empty"
                emptySpots.append(parkingSpot)
            else:
                if enableLogging:
                    print "parking spot " + parkingSpot["name"] + " has car"
            counter += 1
    rezArray = []
    rezArray.append(emptySpots)
    rezArray.append(errorChecksum)
    return rezArray


emptySpots = []
try:

    checkPS = checkParkingSpotsFromJsonData(errorChecksum)
    emptySpots = checkPS[0]
    errorChecksum = checkPS[1]
    #
    try:
        if enableLogging:
            for parkingSpot in emptySpots:
                print parkingSpot
    except:
        emptySpots = []
        print "not iterable"


except Exception, e:
    errorChecksum += utility.getException()
    emptySpots = []
    # utility.logToTextFile(utility.getException())
try:
    jsonEmptyPS = {}
    jsonEmptyPS["error"] = errorChecksum
    jsonEmptyPS["parkingSpots"] = emptySpots

    # save empty spots in file
    print json.dumps(jsonEmptyPS, sort_keys=True, indent=4, ensure_ascii=False)

    # save empty spots in file
    with open(dataFileEmptyPS, 'w') as outfile:
        json.dump(jsonEmptyPS, outfile, sort_keys=True, indent=4, ensure_ascii=False)
except Exception, e:
    utility.logToTextFile(utility.getException())
