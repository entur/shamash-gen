  module.exports = `query tripPatterns($numTripPatterns: Int!, $from: Location!, $to: Location!, $dateTime: DateTime!, $arriveBy: Boolean!, $modes: [Mode]!, $transportSubmodes: [TransportSubmodeFilter], $maxPreTransitWalkDistance: Float) {
    trip(numTripPatterns: $numTripPatterns, wheelchair: false, from: $from, to: $to, dateTime: $dateTime, arriveBy: $arriveBy, modes: $modes, transportSubmodes: $transportSubmodes, maxPreTransitWalkDistance: $maxPreTransitWalkDistance) {
      tripPatterns {
        startTime
        endTime
        duration
        distance
        legs {
          aimedStartTime
          expectedStartTime
          aimedEndTime
          expectedEndTime
          mode
          transportSubmode
          duration
          realtime
          distance
          fromPlace {
            name
            quay {
              id
            }
          }
          toPlace {
            name
            quay {
              id
            }
          }
        }
      }
    }
  }
  `
