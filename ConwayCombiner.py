import urllib.request

url = "https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/PuddingMod.js"  # Replace with the actual URL of the file you want to download
destination_file = "PuddingMod.js"  # Replace with the desired local file name

#urllib.request.urlretrieve(url, destination_file)

conway_file = open("ConwayMod.js", "w", encoding='utf-8')
conway_init = open("ConwayInit.js", "r", encoding='utf-8')
combiner = open("StealthMod.js", "r", encoding='utf-8')

#conway_file.write(pudding.read())
conway_file.write(combiner.read())
conway_file.write(conway_init.read())
#pudding.close()
conway_init.close()
conway_file.close()
combiner.close()