var Log = new function()
{

	var token                               = "";
	var lastDateTime                        = null;
	var isGettingNewest                     = false;
	var isGettingNewestLogStatsByTypeChart  = false;
	var firstTime                           = true;
	var isOnBottomOfDocument                = false;
	var filterMessageTmp                    = "";
	var request;

	this.colorList       = [];
	this.colorListByType = [];
	this.lastDateTime    = Util.dateToMongoDateString(new Date());

	this.initialize = function()
	{
		$('#logDetailsModal, #optionsModal').on('show.bs.modal', function(event) {
			$('.scroll-top-wrapper').removeClass('show');
			$('.scroll-top-wrapper').addClass('hidden');
		});
		
		$('#logDetailsModal, #optionsModal').on('hidden.bs.modal', function(event) {
			$('.scroll-top-wrapper').removeClass('hidden');
			$('.scroll-top-wrapper').addClass('show');
		});
		
		$('#logDetailsModal').on('shown.bs.modal', function(event) {
			$('#logDetailsMessage').focus().select();			
		});	
		
		$('#filterMessage').on('keyup',function(event) {
			if(event.keyCode == 13)
		    {
			    Log.applyFilters();
		    }
		});
		
		Log.getToken();
		Log.startAutoGetNewest();
		Log.startAutoClean();
	}

	this.addLog = function(id, type, message, createdAt)
	{
		var typeHtml = '';
		
		if (type == 'error' || type == 'fatal')
		{
			typeHtml = 'panel-danger';
		}
		else if (type == 'info' || type == 'information')
		{
			typeHtml = 'panel-info';
		}
		else if (type == 'warn' || type == 'warning')
		{
			typeHtml = 'panel-warning';
		}
		else if (type == 'debug' || type == 'trace' || type == 'echo' || type == 'verbose')
		{
			typeHtml = 'panel-primary';
		}
		else if (type == 'success')
		{
			typeHtml = 'panel-success';
		}
		else 
		{
			typeHtml = 'panel-primary';
		}
		
		var createdAtConverted = Util.dateToUserStringUsingHTML(Util.convertUTCDateToLocalDate(new Date(createdAt)));

		var html = '' +
		'<div id="log-row-' + id + '" class="panel ' + typeHtml + ' log-row log-row-type-' + type.toLowerCase() + '" onclick="Log.showDetails(\'' + id + '\')">' +
		'    <div class="panel-heading">' +
		'        <h3 class="panel-title">' +
		'            <span style="float: left;">Type: <span id="log-data-type-' + id + '">' + type + '</span></span>' +
		'            <span style="float: right;"><span id="log-data-created-at-' + id + '">' + createdAtConverted + '</span></span>' +
		'            <span class="panel-clear"></span>' +
		'        </h3>' +
		'    </div>' +
		'    <div class="panel-body">' +
		'        <span id="log-data-message-' + id + '">' + message + '</span>' +
		'    </div>' +
		'</div>';

		if (Util.isOnBottomOfDocument())
		{
			this.isOnBottomOfDocument = true;
		}
		else
		{
			this.isOnBottomOfDocument = false;
		}
		
		$('#results').append(html);
		this.showResults();
	}

	this.getNewest = function()
	{
		if (isGettingNewest)
		{
			return;
		}

		isGettingNewest = true;
		
		var lastDateTimeToSend     = (Util.isUndefined(this.lastDateTime) ? "" : this.lastDateTime);
		var filterMessageTmpToSend = (Util.isUndefined(this.filterMessageTmp) ? "" : this.filterMessageTmp);
		
	    this.request = $.ajax({
		   url: '/api/log/list?token=' + this.token + "&created_at=" + lastDateTimeToSend + "&message=" + filterMessageTmpToSend,
		   type: 'GET',
		   dataType: 'json',
		   success: function(response) {
		       if (!Util.isUndefined(response))
		       {
			       if (response != "" && response != null)
			       {
                       var list = response.data.list

                       if (!Util.isUndefined(list) && !Util.isNull(list))
                       {
                           for (var x = 0; x < list.length; x++)
                           {
                               if (Util.isUndefined(Log.request) || Log.request == null)
                               {
                                   return;
                               }

                               if (!$("#log-row-" + list[x].id).length > 0)
                               {
                                   Log.lastDateTime = Util.dateToMongoDateString(new Date(list[x].created_at));
                                   Log.addLog(list[x].id, list[x].type, list[x].message, list[x].created_at);

                                   if ($('#chkAutoScrollBottom').is(':checked'))
                                   {
                                       if (Log.isOnBottomOfDocument)
                                       {
                                           Util.scrollToBottom();
                                       }
                                   }
                               }
                           }
				       }
			       }    
			       
			       if (Log.firstTime)
			       {
				       Log.firstTime = false;
			       }
		       }
		       
		       isGettingNewest = false;
		       Log.showResultsOrNoResultsByLogsQuantity();
		   },
		   error: function() {
		      isGettingNewest = false;
		      Log.showResultsOrNoResultsByLogsQuantity();
		   }
		});
	}

	this.getNewestLogStatsByTypeChart = function()
	{
		if (isGettingNewestLogStatsByTypeChart)
		{
		    return;
		}

		isGettingNewestLogStatsByTypeChart = true;

		var chartData = [];
		var chartLegend = "";
		var request = $.ajax({
		   url: '/api/log/statsByType?token=' + this.token,
		   type: 'GET',
		   dataType: 'json',
		   success: function(response) {
			   var showResults = false;

			   if (!Util.isUndefined(response))
			   {
				   if (response != "" && response != null)
				   {
				       var list = response.data.list

				       if (!Util.isUndefined(list) && !Util.isNull(list))
				       {
                           for (var x = 0; x < list.length; x++)
                           {
                                var color = Log.getColorForIndexAndType(x, list[x].type);

                                chartData.push({
                                    value: list[x].quantity,
                                    label: list[x].type,
                                    color: color,
                                });

                                chartLegend += '' +
                                '<li>' +
                                '    <span class="chart-legend-color" style="background-color: ' + color + '"></span>' +
                                '    <span class="chart-legend-label">' + list[x].type + ' (' + list[x].quantity + ')</span>' +
                                '</li>';

                                showResults = true;
                           }
                       }
				   }
			   }

			   if (showResults)
			   {
			   	   $('#chart-legend').html(chartLegend);

			   	   Log.showResults('chart');

			       Chart.defaults.global.responsive = true;

				   var ctx = document.getElementById('chart-canvas').getContext('2d');
				   var chart = new Chart(ctx).Doughnut(chartData, {
						animation: false,
						segmentShowStroke: true,
						segmentStrokeWidth: 1
				   });
			   }
			   else
			   {
			   	   Log.showNoResults('chart');
			   }

			   isGettingNewestLogStatsByTypeChart = false;
		   },
		   error: function() {
			   Log.showNoResults('chart');
			   isGettingNewestLogStatsByTypeChart = false;
		   }
		});
	}
	
	this.getToken = function()
	{
		this.token = Util.getQueryParam("token");
	}
	
	this.startAutoGetNewest = function()
	{
		var seconds = 1;
		setInterval(function(){ Log.getNewest(); }, (seconds * 1000));
	}

	this.startAutoGetNewestLogStatsByTypeChart = function()
	{
		Log.getToken();
		Log.initializeColorlist();

		var seconds = 5;
		Log.getNewestLogStatsByTypeChart();
		setInterval(function(){ Log.getNewestLogStatsByTypeChart(); }, (seconds * 1000));
	}

	this.startAutoClean = function()
	{
		var seconds = 10;
		setInterval(function(){ Log.removeOldLogsFromPage(); }, (seconds * 1000));
	}

	this.clear = function()
	{
		$('.log-row').remove();
		this.showNoResults();
	}
	
	this.deleteAllByToken = function()
	{
		this.showLoadingResults();

		$.ajax({
		   url: '/api/log/deleteAll?token=' + this.token,
		   type: 'GET',
		   dataType: 'json',
		   success: function(data) {
			   if ($('#chkAutoScrollBottom').is(':checked')) 
		       {
			       Log.clear();
			       Util.scrollToBottom();
		       }
		   },
		   error: function() {
		      // ignore
		   }
		});
	}
	
	this.showDetails = function(logId)
	{		
		$('#logDetailsType').html($('#log-data-type-' + logId + '').html());
		$('#logDetailsMessage').text($('#log-data-message-' + logId + '').html());
		$('#logDetailsCreatedAt').html($('#log-data-created-at-' + logId + '').html());
		$('#logDetailsModal').modal();
	}
	
	this.clearLogFilters = function()
	{		
		this.filterMessageTmp = '';
		$('#filterMessage').val('');
		this.resetRequest();		
		this.clear();
	}
	
	this.showLogFilters = function(show)
	{		
		if (show)
		{
			$('#filtersContainer').show();
		}
		else
		{
			$('#filtersContainer').hide();			
		}
	}
	
	this.applyFilters = function()
	{	
		this.resetRequest();
		this.filterMessageTmp = $('#filterMessage').val();
		this.clear();
		this.showLoadingResults();
	}
	
	this.resetRequest = function()
	{
		if (!Util.isUndefined(this.request) && !Util.isNull(this.request))
		{	
			this.request.abort();
			this.request = null;
		}
		
		isGettingNewest = false;
	}

	this.removeOldLogsFromPage = function()
	{
		var offset         = 200;
		var total          = $('.log-row').length;
		var offsetToRemove = (total - offset);

		if (total > offset)
		{
			$('.log-row').slice(0, offsetToRemove).remove();
		}
	}

	this.showResults = function(prefix)
	{
		if (Util.isUndefined(prefix))
		{
			prefix = "";
		}
		else
		{
		    if (prefix != "")
            {
                prefix += "-";
            }
		}

		if ($('#' + prefix + 'results').is(':hidden'))
		{
		    $('#' + prefix + 'results').show();
		}

		$('#' + prefix + 'no-results').hide();
		$('#' + prefix + 'loading-results').hide();
	}

	this.showNoResults = function(prefix)
	{
		if (Util.isUndefined(prefix))
		{
			prefix = "";
		}
		else
		{
		    if (prefix != "")
            {
                prefix += "-";
            }
		}

		if ($('#' + prefix + 'no-results').is(':hidden'))
		{
		    $('#' + prefix + 'no-results').show();
		}

		$('#' + prefix + 'results').hide();
		$('#' + prefix + 'loading-results').hide();
	}

	this.showLoadingResults = function(prefix)
	{
		if (Util.isUndefined(prefix))
		{
			prefix = "";
		}
		else
		{
		    if (prefix != "")
            {
                prefix += "-";
            }
		}

		if ($('#' + prefix + 'loading-results').is(':hidden'))
		{
		    $('#' + prefix + 'loading-results').show();
		}

		$('#' + prefix + 'results').hide();
		$('#' + prefix + 'no-results').hide();
	}

	this.showResultsOrNoResultsByLogsQuantity = function(prefix)
	{
		if (Util.isUndefined(prefix))
		{
			prefix = "";
		}
		else
		{
		    if (prefix != "")
		    {
		        prefix += "-";
		    }
		}

		if ($('.log-row').length > 0)
		{
		    this.showResults(prefix);
		}
		else
		{
			this.showNoResults(prefix);
		}
	}

	this.redirectToLogStatsByType = function()
	{
	    Util.redirect("/log/statsByType?token=" + this.token);
	}

	this.redirectToLogIndex = function()
	{
	    Util.redirect("/log/index?token=" + this.token);
	}

	this.initializeColorlist = function()
	{
		this.colorList.push('#E91E63');
        this.colorList.push('#9C27B0');
        this.colorList.push('#673AB7');
        this.colorList.push('#3F51B5');
        this.colorList.push('#2196F3');
        this.colorList.push('#03A9F4');
        this.colorList.push('#00BCD4');
        this.colorList.push('#009688');
        this.colorList.push('#4CAF50');
        this.colorList.push('#8BC34A');
        this.colorList.push('#CDDC39');
        this.colorList.push('#FFC107');
        this.colorList.push('#FF9800');
        this.colorList.push('#FF5722');
        this.colorList.push('#795548');
        this.colorList.push('#9E9E9E');
        this.colorList.push('#607D8B');
        this.colorList.push('#ffebee');
        this.colorList.push('#FCE4EC');
        this.colorList.push('#F3E5F5');
        this.colorList.push('#EDE7F6');
        this.colorList.push('#E8EAF6');
        this.colorList.push('#E3F2FD');
        this.colorList.push('#E1F5FE');
        this.colorList.push('#E0F7FA');
        this.colorList.push('#E0F2F1');
        this.colorList.push('#E8F5E9');
        this.colorList.push('#F1F8E9');
        this.colorList.push('#F9FBE7');
        this.colorList.push('#FFFDE7');
        this.colorList.push('#FFF8E1');
        this.colorList.push('#FFF3E0');
        this.colorList.push('#FBE9E7');
        this.colorList.push('#EFEBE9');
        this.colorList.push('#FAFAFA');
        this.colorList.push('#ECEFF1');
        this.colorList.push('#ffcdd2');
        this.colorList.push('#F8BBD0');
        this.colorList.push('#E1BEE7');
        this.colorList.push('#D1C4E9');
        this.colorList.push('#C5CAE9');
        this.colorList.push('#BBDEFB');
        this.colorList.push('#B3E5FC');
        this.colorList.push('#B2EBF2');
        this.colorList.push('#B2DFDB');
        this.colorList.push('#C8E6C9');
        this.colorList.push('#DCEDC8');
        this.colorList.push('#F0F4C3');
        this.colorList.push('#FFF9C4');
        this.colorList.push('#FFECB3');
        this.colorList.push('#FFE0B2');
        this.colorList.push('#FFCCBC');
        this.colorList.push('#D7CCC8');
        this.colorList.push('#F5F5F5');
        this.colorList.push('#CFD8DC');
        this.colorList.push('#ef9a9a');
        this.colorList.push('#F48FB1');
        this.colorList.push('#CE93D8');
        this.colorList.push('#B39DDB');
        this.colorList.push('#9FA8DA');
        this.colorList.push('#90CAF9');
        this.colorList.push('#81D4FA');
        this.colorList.push('#80DEEA');
        this.colorList.push('#80CBC4');
        this.colorList.push('#A5D6A7');
        this.colorList.push('#C5E1A5');
        this.colorList.push('#E6EE9C');
        this.colorList.push('#FFF59D');
        this.colorList.push('#FFE082');
        this.colorList.push('#FFCC80');
        this.colorList.push('#FFAB91');
        this.colorList.push('#BCAAA4');
        this.colorList.push('#EEEEEE');
        this.colorList.push('#B0BEC5');
        this.colorList.push('#e57373');
        this.colorList.push('#F06292');
        this.colorList.push('#BA68C8');
        this.colorList.push('#9575CD');
        this.colorList.push('#7986CB');
        this.colorList.push('#64B5F6');
        this.colorList.push('#4DB6AC');
        this.colorList.push('#AED581');
        this.colorList.push('#DCE775');
        this.colorList.push('#FFF176');
        this.colorList.push('#FFD54F');
        this.colorList.push('#FFB74D');
        this.colorList.push('#FF8A65');
        this.colorList.push('#A1887F');
        this.colorList.push('#E0E0E0');
        this.colorList.push('#90A4AE');
        this.colorList.push('#ef5350');
        this.colorList.push('#EC407A');
        this.colorList.push('#AB47BC');
        this.colorList.push('#7E57C2');
        this.colorList.push('#5C6BC0');
        this.colorList.push('#29B6F6');
        this.colorList.push('#26C6DA');
        this.colorList.push('#26A69A');
        this.colorList.push('#66BB6A');
        this.colorList.push('#9CCC65');
        this.colorList.push('#D4E157');
        this.colorList.push('#FFEE58');
        this.colorList.push('#FFCA28');
        this.colorList.push('#FFA726');
        this.colorList.push('#FF7043');
        this.colorList.push('#8D6E63');
        this.colorList.push('#BDBDBD');
        this.colorList.push('#78909C');
        this.colorList.push('#f44336');
        this.colorList.push('#E91E63');
        this.colorList.push('#9C27B0');
        this.colorList.push('#673AB7');
        this.colorList.push('#3F51B5');
        this.colorList.push('#2196F3');
        this.colorList.push('#03A9F4');
        this.colorList.push('#00BCD4');
        this.colorList.push('#009688');
        this.colorList.push('#4CAF50');
        this.colorList.push('#8BC34A');
        this.colorList.push('#CDDC39');
        this.colorList.push('#FFC107');
        this.colorList.push('#FF9800');
        this.colorList.push('#FF5722');
        this.colorList.push('#795548');
        this.colorList.push('#9E9E9E');
        this.colorList.push('#607D8B');
        this.colorList.push('#e53935');
        this.colorList.push('#D81B60');
        this.colorList.push('#8E24AA');
        this.colorList.push('#5E35B1');
        this.colorList.push('#3949AB');
        this.colorList.push('#1E88E5');
        this.colorList.push('#039BE5');
        this.colorList.push('#00ACC1');
        this.colorList.push('#00897B');
        this.colorList.push('#7CB342');
        this.colorList.push('#C0CA33');
        this.colorList.push('#FDD835');
        this.colorList.push('#FFB300');
        this.colorList.push('#FB8C00');
        this.colorList.push('#F4511E');
        this.colorList.push('#6D4C41');
        this.colorList.push('#757575');
        this.colorList.push('#546E7A');
        this.colorList.push('#d32f2f');
        this.colorList.push('#C2185B');
        this.colorList.push('#7B1FA2');
        this.colorList.push('#512DA8');
        this.colorList.push('#303F9F');
        this.colorList.push('#1976D2');
        this.colorList.push('#0288D1');
        this.colorList.push('#0097A7');
        this.colorList.push('#00796B');
        this.colorList.push('#388E3C');
        this.colorList.push('#689F38');
        this.colorList.push('#AFB42B');
        this.colorList.push('#FBC02D');
        this.colorList.push('#FFA000');
        this.colorList.push('#F57C00');
        this.colorList.push('#E64A19');
        this.colorList.push('#5D4037');
        this.colorList.push('#616161');
        this.colorList.push('#455A64');
        this.colorList.push('#c62828');
        this.colorList.push('#AD1457');
        this.colorList.push('#6A1B9A');
        this.colorList.push('#4527A0');
        this.colorList.push('#283593');
        this.colorList.push('#1565C0');
        this.colorList.push('#0277BD');
        this.colorList.push('#00838F');
        this.colorList.push('#00695C');
        this.colorList.push('#2E7D32');
        this.colorList.push('#558B2F');
        this.colorList.push('#9E9D24');
        this.colorList.push('#F9A825');
        this.colorList.push('#FF8F00');
        this.colorList.push('#EF6C00');
        this.colorList.push('#D84315');
        this.colorList.push('#4E342E');
        this.colorList.push('#424242');
        this.colorList.push('#37474F');
        this.colorList.push('#880E4F');
        this.colorList.push('#4A148C');
        this.colorList.push('#311B92');
        this.colorList.push('#1A237E');
        this.colorList.push('#0D47A1');
        this.colorList.push('#01579B');
        this.colorList.push('#006064');
        this.colorList.push('#004D40');
        this.colorList.push('#1B5E20');
        this.colorList.push('#33691E');
        this.colorList.push('#827717');
        this.colorList.push('#F57F17');
        this.colorList.push('#FF6F00');
        this.colorList.push('#E65100');
        this.colorList.push('#BF360C');
        this.colorList.push('#3E2723');
        this.colorList.push('#212121');
        this.colorList.push('#263238');
        this.colorList.push('#ff8a80');
        this.colorList.push('#FF80AB');
        this.colorList.push('#EA80FC');
        this.colorList.push('#B388FF');
        this.colorList.push('#8C9EFF');
        this.colorList.push('#82B1FF');
        this.colorList.push('#80D8FF');
        this.colorList.push('#84FFFF');
        this.colorList.push('#A7FFEB');
        this.colorList.push('#B9F6CA');
        this.colorList.push('#CCFF90');
        this.colorList.push('#F4FF81');
        this.colorList.push('#FFFF8D');
        this.colorList.push('#FFE57F');
        this.colorList.push('#FFD180');
        this.colorList.push('#FF9E80');
        this.colorList.push('#ff5252');
        this.colorList.push('#FF4081');
        this.colorList.push('#E040FB');
        this.colorList.push('#7C4DFF');
        this.colorList.push('#536DFE');
        this.colorList.push('#448AFF');
        this.colorList.push('#40C4FF');
        this.colorList.push('#18FFFF');
        this.colorList.push('#64FFDA');
        this.colorList.push('#69F0AE');
        this.colorList.push('#B2FF59');
        this.colorList.push('#EEFF41');
        this.colorList.push('#FFFF00');
        this.colorList.push('#FFD740');
        this.colorList.push('#FFAB40');
        this.colorList.push('#FF6E40');
        this.colorList.push('#ff1744');
        this.colorList.push('#F50057');
        this.colorList.push('#D500F9');
        this.colorList.push('#651FFF');
        this.colorList.push('#3D5AFE');
        this.colorList.push('#2979FF');
        this.colorList.push('#00B0FF');
        this.colorList.push('#00E5FF');
        this.colorList.push('#1DE9B6');
        this.colorList.push('#00E676');
        this.colorList.push('#76FF03');
        this.colorList.push('#C6FF00');
        this.colorList.push('#FFEA00');
        this.colorList.push('#FFC400');
        this.colorList.push('#FF9100');
        this.colorList.push('#FF3D00');
        this.colorList.push('#d50000');
        this.colorList.push('#C51162');
        this.colorList.push('#AA00FF');
        this.colorList.push('#6200EA');
        this.colorList.push('#304FFE');
        this.colorList.push('#2962FF');
        this.colorList.push('#0091EA');
        this.colorList.push('#00B8D4');
        this.colorList.push('#00BFA5');
        this.colorList.push('#00C853');
        this.colorList.push('#64DD17');
        this.colorList.push('#AEEA00');
        this.colorList.push('#FFD600');
        this.colorList.push('#FFAB00');
        this.colorList.push('#FF6D00');
        this.colorList.push('#DD2C00');
        this.colorList.push('#1976D2');
        this.colorList.push('#BBDEFB');
        this.colorList.push('#FFD740');
        this.colorList.push('#FFE57F');

		this.colorListByType.push("error", "fatal", "info", "information", "warn", "warning", "verbose", "debug", "trace", "echo", "success");

		this.colorListByType["fatal"]       = '#052e66';
		this.colorListByType["error"]       = '#F44336';
		this.colorListByType["info"]        = '#1f94cd';
		this.colorListByType["information"] = this.colorListByType["info"];
		this.colorListByType["warn"]        = '#eab53e';
		this.colorListByType["warning"]     = this.colorListByType["warn"];
		this.colorListByType["verbose"]     = '#00BCD4';
		this.colorListByType["debug"]       = '#61457a';
		this.colorListByType["trace"]       = '#415fc5';
		this.colorListByType["echo"]        = '#eb8a49';
		this.colorListByType["success"]     = '#66e06f';
	}

	this.getColorForIndexAndType = function(index, type)
	{
	    if (this.colorListByType.indexOf(type) < 0)
	    {
	        return this.colorList[index];
	    }

	    return this.colorListByType[type];
	}

};