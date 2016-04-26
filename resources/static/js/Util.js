var Util = new function()
{
	
    this.dateToISODateString = function(date)
    {
        return date.getUTCFullYear()+'-'
            + Util.padNumber(date.getUTCMonth()+1)+'-'
            + Util.padNumber(date.getUTCDate())+'T'
            + Util.padNumber(date.getUTCHours())+':'
            + Util.padNumber(date.getUTCMinutes())+':'
            + Util.padNumber(date.getUTCSeconds())+'Z';
    }

    this.dateToMongoDateString = function(date)
    {
        return date.getUTCFullYear()+'-'
            + Util.padNumber(date.getUTCMonth()+1)+'-'
            + Util.padNumber(date.getUTCDate())+'T'
            + Util.padNumber(date.getUTCHours())+':'
            + Util.padNumber(date.getUTCMinutes())+':'
            + Util.padNumber(date.getUTCSeconds())+'.'
            + Util.padNumber(date.getUTCMilliseconds());
    }

    this.dateToUserString = function(date)
    {
        return date.getUTCFullYear()+'-'
            + Util.padNumber(date.getUTCMonth()+1)+'-'
            + Util.padNumber(date.getUTCDate())+' - '
            + Util.padNumber(date.getUTCHours())+':'
            + Util.padNumber(date.getUTCMinutes())+':'
            + Util.padNumber(date.getUTCSeconds());
    }

    this.dateToUnixDateString = function(date)
    {
        return date.getUTCFullYear()+'-'
            + Util.padNumber(date.getUTCMonth()+1)+'-'
            + Util.padNumber(date.getUTCDate())+' '
            + Util.padNumber(date.getUTCHours())+':'
            + Util.padNumber(date.getUTCMinutes())+':'
            + Util.padNumber(date.getUTCSeconds());
    }

    this.dateToUserStringUsingHTML = function(date)
    {
        return date.getUTCFullYear()+'-'
            + Util.padNumber(date.getUTCMonth()+1)+'-'
            + Util.padNumber(date.getUTCDate())+' - '
            + Util.padNumber(date.getUTCHours())+':'
            + Util.padNumber(date.getUTCMinutes())+':'
            + Util.padNumber(date.getUTCSeconds());
    }
    
    this.convertUTCDateToLocalDate = function(date) 
    {
	    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
	
	    var offset = date.getTimezoneOffset() / 60;
	    var hours = date.getHours();
	
	    newDate.setHours(hours - offset);
	
	    return newDate;   
	}

    this.padNumber = function(number)
    {
        return (number < 10 ? '0' + number : number);
    }

	this.isUndefined = function(data)
	{
		return ('undefined' == typeof data);
	}

	this.isNull = function(data)
	{
		return (null == data);
	}

	this.showProgressWindow = function(message)
	{
		if (Util.isUndefined(message))
		{
			message = '<p>We are processing your request.</p><p>Please, wait a minute...</p>';
		}

		$('#modalProgressWindowMessage').html(message);

		$('#modalProgressWindow').modal({
			keyboard:false,
			backdrop:'static'
		});
	}

	this.hideProgressWindow = function()
	{
		$('#modalProgressWindow').modal('hide');
	}

	this.showErrorWindow = function(errors)
	{
		var message = '';

		if (Util.isUndefined(errors))
		{
			message = 'Error when process your request. Please, try again!';
		}
		else if (errors instanceof Array && errors.length > 0)
		{
			var messageList = '';

			for(x = 0; x < errors.length; x++)
			{
				messageList += '<li>' + errors[x][1] + '</li>';
			}

			message = '<ul class="modalErrorWindowMessageList">' + messageList + '</ul>';
		}

		$('#modalErrorWindowMessage').html(message);
		$('#modalErrorWindow').modal();
	}

	this.showSuccessWindow = function(message)
	{
		if (Util.isUndefined(message))
		{
			message = 'Your request was processed successfully!';
		}

		$('#modalSuccessWindowMessage').html(message);
		$('#modalSuccessWindow').modal();
	}
	
	this.convertDBDateTimetoDate = function(dbDateTime)
	{
		var t = dbDateTime.split(/[- :]/);
		var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
		return d;
	}

	this.redirect = function(url)
	{
		window.location.href = url;
	}
	
	this.getQueryParam = function(name) 
	{
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	
	this.scrollToTop = function() 
	{
		verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
		element = $('body');
		offset = element.offset();
		offsetTop = offset.top;
		$('html, body').animate({scrollTop: offsetTop}, 0, 'linear');
	}

	this.scrollToBottom = function() 
	{
		$('html, body').animate({scrollTop: $(document).height()-$(window).height()}, 0, 'linear');
	}
	
	this.isOnBottomOfDocument = function() 
	{
		if($(window).scrollTop() + $(window).height() == $(document).height()) 
		{
			return true;
		}
		
		return false;
	}

	this.getRandomColor = function()
	{
	    return '#' + (function co(lor){   return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (lor.length == 6) ?  lor : co(lor); })('');
	}

};