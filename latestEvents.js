(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.latestEvents = factory();
  }
}(this, function() {

    return function() {
        var events = {};
        var dates = {};

        function handle(event) {
            var currentDate = dates[event.id];
            var newDate = Date.parse(event.date);

            if (!currentDate || newDate >= currentDate) {
                events[event.id] = event;
                dates[event.id] = newDate;

                if (event.action === 'add') latest.added(event);
                if (event.action === 'remove') latest.removed(event);
                latest.event(event);
            }
        }

        function latest() {
            var addedEvents = [];

            for (var key in events) {
                if (events[key].action !== 'remove') {
                    addedEvents.push(events[key]);
                }
            }

            return addedEvents;
        }

        latest.process = function(event) {
            if (Array.isArray(event)) {
                event.forEach(handle);
            } else {
                handle(event);
            }
        };

        latest.added = function() {};
        latest.removed = function() {};
        latest.event = function() {};

        return latest;
    }

}));
