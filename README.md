Suggest
=======

A JQuery plugin for suggestions on search fields. The aim is to create a JQuery Suggestion which looks and feels like the Facebook one. It receives a JSON from a REST call which will contain categories (each with a name), and each category will contain an array of suggestions. Each suggestion has a text (mandatory), a url for image and an additional text (or a description) which are optional. 

## TO DO

- [ ] Tests
- [ ] Cases and validation for json received (it now crashes if the json is not what we expect)
- [ ] Caching (only replacing the suggestions that are no longer valid from the box)
