// general
goci.Job.SetProgress(10);
goci.Job.UpdateDuration();

var tab = goci.const.OG_CONSOLE;
var integrationName = "";

// integrations
goci.Job.Log(tab, "Total of loaded integrations: <strong>" + goci.IntegrationManager.Count() + "</strong>");

var integrations = [
	{
		name: "HttpGet",
		params: {
			"url": "http://www.pcoutinho.com"
		}
	},
	{
		name: "PushBullet",
		params: {
			"accessToken": "[REQUIRED]",
			"deviceIden": "",
			"email": "[REQUIRED]",
			"channelTag": "",
			"clientIden": "",
			"title": "Push title",
			"body": "Push body"
		}
	},
	{
		name: "SendGrid",
		params: {
			"to": [
				"[REQUIRED]"
			],
			"fromEmail": "[REQUIRED]",
			"fromName": "[REQUIRED]",
			"key": "[REQUIRED]",
			"mailSubject": "Mail subject",
			"mailBody": "Mail body with HTML"
		}
	},
	{
		name: "SlackWebHook",
		params: {
			"url": "[REQUIRED]",
			"channel": "",
			"attachmentTitle": "Attachment title",
			"attachmentBody": "Attachment body",
			"attachmentColor": "#ed5565",
			"messageBody": "Message body"
		}
	}
];

// execute all integrations
for (var x = 0; x < integrations.length; x++) {
	var progress = parseInt((x * 100) / integrations.length);
	goci.Job.SetProgress(progress);

	var integration = integrations[x];
	goci.Job.Log(tab, "Calling integration: <strong>" + integration.name + "</strong>...");

	var response = goci.IntegrationManager.Call(integration.name, integration.params);

	if (response.Success) {
		goci.Job.LogSuccess(tab, "Integration <strong>" + integration.name + "</strong> called with success");
	} else {
		var integrationError = response.GetFirstDataError();
		goci.Job.LogError(tab, "Integration <strong>" + integration.name + "</strong> called with error: " + integrationError);
	}
}

goci.Job.SetProgress(100);
goci.Job.UpdateDuration();
