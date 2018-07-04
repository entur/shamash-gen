# shamash-gen

Generer URL til shamash basert på rå respons fra f.eks. Chrome.

```
npm install --global @entur/shamash-gen
```

Bruk:

```
Usage: shamash-gen [options] <source>

Create a shamash URL from raw graphql response

Options:

  -V, --version  output the version number
  -t, --test     Use test environment
  -h, --help     output usage information
```

Eksempel:

```
shamash-gen '{"query":"\n    query StopPlaces($id:String!) {\n        stopPlace(id:$id) {\n          id\n          name\n          latitude\n          longitude\n        }\n    }\n    ","variables":{"id":"NSR:StopPlace:6493"}}'
```

Gir følgende svar:

```
https://api.entur.org/doc/shamash-journeyplanner/?variables={"id":"NSR:StopPlace:6493"}&query=query StopPlaces($id:String!) {  stopPlace(id:$id) {  id  name  latitude  longitude  }  }
```
