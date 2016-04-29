var Util = new function()
{

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

		$('#modalProgressWindow').modal(
		{
			keyboard: false,
			backdrop: 'static'
		});
	}

	this.hideProgressWindow = function()
	{
		$('#modalProgressWindow').modal('hide');
	}

	this.showErrorWindow = function(errors, onlyFirst)
	{
		var message = '';

		if (Util.isUndefined(errors))
		{
			message = 'Error when process your request. Please, try again!';
		}
		else if (onlyFirst == true)
		{
		    if (errors.length > 0)
		    {
		        message = '<h4>' + errors[0][1] + '</h4>';
		    }
		}
		else if (errors instanceof Array && errors.length > 0)
		{
			var messageList = '';

            for (x = 0; x < errors.length; x++)
			{
				messageList += '<li><p>' + errors[x][1] + '</p></li>';
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

    this.getFirstErrorMessage = function(errors)
    {
        if (this.isUndefined(errors) || !(errors instanceof Array) || errors.length == 0)
        {
            return "";
        }

        return errors[0][1];
    }

	this.redirect = function(url)
	{
		window.location.href = url;
	}

	this.getQueryParam = function(name)
	{
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	this.scrollToTop = function()
	{
		verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
		element = $('body');
		offset = element.offset();
		offsetTop = offset.top;
		$('html, body').animate(
		{
			scrollTop: offsetTop
		}, 0, 'linear');
	}

	this.scrollToBottom = function()
	{
		$('html, body').animate(
		{
			scrollTop: $(document).height() - $(window).height()
		}, 0, 'linear');
	}

	this.isOnBottomOfDocument = function()
	{
		if ($(window).scrollTop() + $(window).height() == $(document).height())
		{
			return true;
		}

		return false;
	}

	this.getRandomColor = function()
	{
		return '#' + (function co(lor)
		{
			return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
		})('');
	}

	this.showData = function(prefix)
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

		if ($('#' + prefix + 'data').is(':hidden'))
		{
			$('#' + prefix + 'data').show();
		}

		$('#' + prefix + 'no-data').hide();
		$('#' + prefix + 'loading-data').hide();
		$('#' + prefix + 'error-data').hide();
	}

	this.showNoData = function(prefix)
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

		if ($('#' + prefix + 'no-data').is(':hidden'))
		{
			$('#' + prefix + 'no-data').show();
		}

		$('#' + prefix + 'data').hide();
		$('#' + prefix + 'loading-data').hide();
		$('#' + prefix + 'error-data').hide();
	}

	this.showErrorData = function(message, prefix)
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

		if ($('#' + prefix + 'error-data').is(':hidden'))
		{
			$('#' + prefix + 'error-data').show();
		}

		if (Util.isUndefined(message))
		{
		    message = "";
		}

        $('#' + prefix + 'error-data-message').html(message);

		$('#' + prefix + 'data').hide();
		$('#' + prefix + 'loading-data').hide();
		$('#' + prefix + 'no-data').hide();
	}

	this.showLoadingData = function(prefix)
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

		if ($('#' + prefix + 'loading-data').is(':hidden'))
		{
			$('#' + prefix + 'loading-data').show();
		}

		$('#' + prefix + 'data').hide();
		$('#' + prefix + 'no-data').hide();
		$('#' + prefix + 'error-data').hide();
	}

	this.showOptionsContainer = function(prefix)
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

        if ($('#' + prefix + 'options-container').is(':hidden'))
		{
			$('#' + prefix + 'options-container').show();
		}
	}

};