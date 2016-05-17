function WebResponse()
{

    this.success = false;
    this.message = "";
    this.data = {};

    this.parse = function(data)
    {
        if (data instanceof Object)
        {
            return this.parseFromObject(data)
        }
        else if (data instanceof String)
        {
            return this.parseFromString(data);
        }

        return null;
    };

    this.parseFromObject = function(fromObject)
    {
        // main object
        if (this.isNullOrUndefined(fromObject))
        {
            fromObject = {};
        }

        // success property
        if (this.isNullOrUndefined(fromObject.success))
        {
            this.success = false;
        }
        else
        {
            this.success = fromObject.success;
        }

        // message property
        if (this.isNullOrUndefined(fromObject.message))
        {
            this.message = "";
        }
        else
        {
            this.message = fromObject.message;
        }

        // data property
        if (this.isNullOrUndefined(fromObject.data))
        {
            this.data = {};
        }
        else
        {
            this.data = fromObject.data;
        }

        // data error property
        if (this.isNullOrUndefined(fromObject.data.errors))
        {
            this.data.errors = [];
        }
        else
        {
            this.data.errors = fromObject.data.errors;
        }

        return this;
    };

    this.parseFromString = function(fromString)
    {
        var object = eval(fromString);
        return this.parseFromObject(object);
    };

    this.getDataItem = function(item)
    {
        if (this.isNullOrUndefined(this.data))
        {
            return null;
        }

        if (this.isNullOrUndefined(this.data[item]))
        {
            return null;
        }

        return this.data[item];
    };

    this.isNullOrUndefined = function(object)
    {
        if (object == null || object == undefined)
        {
            return true;
        }

        return false;
    };

}