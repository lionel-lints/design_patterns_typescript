// Some example types for illustration purposes
type CSV = string
type binaryString = string
type JSONBlob = string
type ConversionOutput =  CSV | binaryString | JSONBlob;


interface Strategy {
  convert <ConversionOutput> (dataSetName: string): ConversionOutput;
}


// just some example data for what a database request would do
const data:any = {
  'key2':{
    'toCSV': ():string => {
      return 'a,comma,seperated,value,string,for,key,2'
    },
    'toBinaryString': ():string => {
      return btoa('a binaryString for key2')
    },
    'toJSON': ():string => {
      return JSON.stringify({ 'key2': 'value2'})
    }
  },
  'key1':{
    'toCSV': ():string => {
      return 'a,comma,seperated,value,string,for,key,1'
    },
    'toBinaryString': ():string => {
      return btoa('a binaryString for key1')
    },
    'toJSON': ():string => {
      return JSON.stringify({ 'key1': 'value1'})
    }
  }
}

// the concrete classes which implement different strategies.
class CSVConverter implements Strategy {
  constructor(){}
  convert <CSV> (dataSetName: string): CSV {
    return data[dataSetName].toCSV()
  }
}

class binaryStringConverter implements Strategy {
  constructor(){}
  convert <binaryString> (dataSetName: string): binaryString {
    return data[dataSetName].toBinaryString()
  }
}

class JSONConverter implements Strategy {
  constructor(){}
  convert <JSONBlob> (dataSetName: string): JSONBlob {
    return data[dataSetName].toJSON()
  }
}

export {
  Strategy,
  ConversionOutput,
  CSVConverter,
  binaryStringConverter,
  JSONConverter
}
