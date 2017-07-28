'use strict';
angular.module('dataCache', []).
factory('dataCache', function() {
  //var shinyNewServiceInstance;
  // factory function body that constructs shinyNewServiceInstance

    var programCache;

    return {
      isEmpty: function() {
        return programCache === undefined;
      },
      getProgramNumber: function() {
        return programCache === undefined? 0:programCache.length;
      },
      getProgramCache: function() {
        return programCache;
      },
      setProgramCache: function(state) {
        programCache = state;
      },
      findProgramByName: function(name){
        for(var i in programCache){
          if(programCache[i].Name == name){
            return programCache[i];
          }
        }
      }
    };
});
