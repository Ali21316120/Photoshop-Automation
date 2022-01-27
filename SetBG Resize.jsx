#include "json2.js"

var outFolder = app.activeDocument; // psd name
var outPath = outFolder.path;

var groups = app.activeDocument.layerSets; // loops through all groups
var group_count = groups.length;

var exportedBackgrounds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];	//10
var exportedSkin = [0, 0, 0, 0, 0, 0];	//6
var exportedMouth = [0, 0, 0, 0, 0, 0, 0, 0, 0];	//9
var exportedEyes = [0, 0, 0, 0, 0, 0, 0, 0, 0];	//9
var exportedNoses = [0, 0, 0, 0, 0, 0, 0];	//7
var exportedEars = [0, 0, 0, 0, 0];	//5
var exportedClothing = [0, 0, 0, 0, 0, 0, 0, 0, 0];	//9
var exportedEyeAccessories = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];	//10
var exportedHats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];	//18
var exportedOther = [0, 0, 0, 0, 0, 0];	//6

function Visible() {
	var attributes = [];

	var BACKGROUNDS = [12, 8, 2, 2, 12, 6, 15, 15, 16, 12];	//10
	var SKIN = [21, 23, 9, 18, 5, 24];	//6
	var MOUTH = [3, 9, 6, 15, 18, 15, 10, 8, 16];	//9
	var EYES = [9, 15, 5, 5, 11, 8, 15, 6, 11];	//9
	var NOSES = [15, 5, 15, 17, 17, 17, 14];	//7
	var EARS = [3, 10, 10, 7, 15];	//5
	var CLOTHING = [8, 5, 15, 11, 16, 15, 6, 10, 3];	//9
	var EYE_ACCESSORIES = [7, 8, 5, 7, 3, 9, 5, 2, 8, 15];	//10
	var HATS = [2, 0.1, 0.5, 0.5, 9, 6, 4, 7, 7, 3, 12, 8, 5, 1, 8, 3, 7, 3];	//18
	var OTHER = [6, 15, 14, 10, 5, 11];	//6

	// Select the random layers and make the json for the layers.
	for (var i = 0; i < group_count; i++) {
        var group = groups[i];
		var tmp = group.layers.length;
		group.visible = true;
		var groupChildArr = group.layers;
		
		var randNum = Math.random();
		var randLays = Math.floor(randNum * tmp);
		var randNumForRarity = randNum * 100;

		/* Save(); */
		var initMinPercentage = 0;

		var arrayForRarity = [];
		if(group.name == "BACKGROUND") arrayForRarity = BACKGROUNDS;
		if(group.name == "SKIN") arrayForRarity = SKIN;
		if(group.name == "MOUTH") arrayForRarity = MOUTH;
		if(group.name == "EYES") arrayForRarity = EYES;
		if(group.name == "NOSES") arrayForRarity = NOSES;
		if(group.name == "EARS") arrayForRarity = EARS;
		if(group.name == "CLOTHING/NECKLACES") arrayForRarity = CLOTHING;
		if(group.name == "EYE ACCESSORIES") arrayForRarity = EYE_ACCESSORIES;
		if(group.name == "HATS/ TOP OF HEAD") arrayForRarity = HATS;
		if(group.name == "OTHER") arrayForRarity = OTHER;

		for(var j = 0; j < arrayForRarity.length; j++)
		{
			if(randNumForRarity < (arrayForRarity[j] + initMinPercentage) && randNumForRarity >= initMinPercentage)
			{
				if(group.name == "BACKGROUND") exportedBackgrounds[j] = exportedBackgrounds[j] + 1;
				if(group.name == "SKIN") exportedSkin[j] = exportedSkin[j] + 1;
				if(group.name == "MOUTH") exportedMouth[j] = exportedMouth[j] + 1;
				if(group.name == "EYES") exportedEyes[j] = exportedEyes[j] + 1;
				if(group.name == "NOSES") exportedNoses[j] = exportedNoses[j] + 1;
				if(group.name == "EARS") exportedEars[j] = exportedEars[j] + 1;
				if(group.name == "CLOTHING/NECKLACES") exportedClothing[j] = exportedClothing[j] + 1;
				if(group.name == "EYE ACCESSORIES") exportedEyeAccessories[j] = exportedEyeAccessories[j] + 1;
				if(group.name == "HATS/ TOP OF HEAD") exportedHats[j] = exportedHats[j] + 1;
				if(group.name == "OTHER") exportedOther[j] = exportedOther[j] + 1;

				randLays = j;
				break;
			}

			initMinPercentage += arrayForRarity[j];
		}

		groupChildArr[randLays].visible = true;
        
        var attr = {
            trait_type: group.name,
            value: groupChildArr[randLays].name
        };
        attributes[attributes.length] = attr;
	}

	attributes = {
		name: "",
		description: "",
		image: "",
		attributes: attributes
	};

	var json = JSON.stringify(attributes, null, 2);
	var jsonFile = new File(outPath + "/JSON/" + num + ".json");
	jsonFile.encoding = "UTF-8";
	jsonFile.open('w');
	jsonFile.write(json);
	jsonFile.close();
	Save();
	Revert();
}

function Save() {
	var fName = "PNG";   // define folder name
	var f = new Folder(outPath + "/" + fName);
	if (!f.exists) {
		f.create()
	}
	var saveFile = new File(outPath + "/" + fName + "/" + "Halloween_" + num + ".png");
	pngSaveOptions = new PNGSaveOptions();
	pngSaveOptions.interlaced = false;
	app.activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
}

function Revert() {
	var idRvrt = charIDToTypeID("Rvrt");
	executeAction(idRvrt, undefined, DialogModes.NO);
}

var count = prompt("How many combinations do you want?", "");
for (var x = 0; x < count; x++) {
	var num = x;
	Visible();
}
var txtFile = new File(outPath + "/rarity" + num + ".txt");
txtFile.encoding = "UTF-8";
txtFile.open('w');
for(var i = 0; i < exportedBackgrounds.length; i++)
{
	exportedBackgrounds[i] = exportedBackgrounds[i] / count;
}

var exportedRarityText = "";

// Select the random layers and make the json for the layers.
for (var k = 0; k < group_count; k++) {
	var group = groups[k];
	var tmp = group.layers.length;
	group.visible = true;
	var groupChildArr = group.layers;

	var resultArray = [];
	if(group.name == "BACKGROUND") resultArray = exportedBackgrounds;
	if(group.name == "SKIN") resultArray = exportedSkin;
	if(group.name == "MOUTH") resultArray = exportedMouth;
	if(group.name == "EYES") resultArray = exportedEyes;
	if(group.name == "NOSES") resultArray = exportedNoses;
	if(group.name == "EARS") resultArray = exportedEars;
	if(group.name == "CLOTHING/NECKLACES") resultArray = exportedClothing;
	if(group.name == "EYE ACCESSORIES") resultArray = exportedEyeAccessories;
	if(group.name == "HATS/ TOP OF HEAD") resultArray = exportedHats;
	if(group.name == "OTHER") resultArray = exportedOther;

	exportedRarityText += group.name + " : ";
	
	for(var i = 0; i < resultArray.length; i++)
	{
		exportedRarityText += "\n";
		exportedRarityText += groupChildArr[i].name + ":";

		resultArray[i] = Math.floor(resultArray[i] / count * 100) + "%";
		exportedRarityText += resultArray[i];
	}

	exportedRarityText += "\n\n";
}

txtFile.write(exportedRarityText);
txtFile.close();