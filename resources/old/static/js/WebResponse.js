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
        this.success = fromObject["success"];

        if (this.isNullOrUndefined(this.success))
        {
            this.success = false;
        }

        // message property
        this.message = fromObject["message"];

        if (this.isNullOrUndefined(this.message))
        {
            this.message = "";
        }

        // data property
        this.data = fromObject["data"];

        if (this.isNullOrUndefined(this.data))
        {
            this.data = {};
        }

        // data error property
        this.data.errors = this.data["errors"];

        if (this.isNullOrUndefined(this.data.errors))
        {
            this.data.errors = [];
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