var Project = new function() {

    this.list = function() {
        this.request = $.ajax({
            url: '/api/project/list",
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (!Util.isUndefined(response)) {
                    if (response != "" && response != null) {
                        if (response.success) {
                            var list = response.data.list

                            if (!Util.isUndefined(list) && !Util.isNull(list)) {
                                for (var x = 0; x < list.length; x++) {
                                    if (Util.isUndefined(Log.request) || Log.request == null) {
                                        return;
                                    }

                                    if (!$("#log-row-" + list[x].id).length > 0) {
                                        Log.lastDateTime = Util.dateToMongoDateString(new Date(list[x].created_at));
                                        Log.addLog(list[x].id, list[x].type, list[x].message, list[x].created_at);

                                        if ($('#chkAutoScrollBottom').is(':checked')) {
                                            if (Log.isOnBottomOfDocument) {
                                                Util.scrollToBottom();
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                }

                Project.showResultsOrNoResultsByLogsQuantity();
            },
            error: function() {
                isGettingNewest = false;
                Project.showResultsOrNoResultsByLogsQuantity();
            }
        });
    }

    this.clear = function() {
        $('.log-row').remove();
        this.showNoResults();
    }

    this.showResults = function(prefix) {
        if (Util.isUndefined(prefix)) {
            prefix = "";
        } else {
            if (prefix != "") {
                prefix += "-";
            }
        }

        if ($('#' + prefix + 'results').is(':hidden')) {
            $('#' + prefix + 'results').show();
        }

        $('#' + prefix + 'no-results').hide();
        $('#' + prefix + 'loading-results').hide();
    }

    this.showNoResults = function(prefix) {
        if (Util.isUndefined(prefix)) {
            prefix = "";
        } else {
            if (prefix != "") {
                prefix += "-";
            }
        }

        if ($('#' + prefix + 'no-results').is(':hidden')) {
            $('#' + prefix + 'no-results').show();
        }

        $('#' + prefix + 'results').hide();
        $('#' + prefix + 'loading-results').hide();
    }

    this.showLoadingResults = function(prefix) {
        if (Util.isUndefined(prefix)) {
            prefix = "";
        } else {
            if (prefix != "") {
                prefix += "-";
            }
        }

        if ($('#' + prefix + 'loading-results').is(':hidden')) {
            $('#' + prefix + 'loading-results').show();
        }

        $('#' + prefix + 'results').hide();
        $('#' + prefix + 'no-results').hide();
    }

    this.showResultsOrNoResultsByLogsQuantity = function(prefix) {
        if (Util.isUndefined(prefix)) {
            prefix = "";
        } else {
            if (prefix != "") {
                prefix += "-";
            }
        }

        if ($('.log-row').length > 0) {
            this.showResults(prefix);
        } else {
            this.showNoResults(prefix);
        }
    }

};