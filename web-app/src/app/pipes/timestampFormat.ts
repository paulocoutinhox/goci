import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'timestampFormat'
})

export class TimestampFormat implements PipeTransform {

	transform(value: any, ...args: string[]): any {
		if (value) {
			var date = value instanceof Date ? value : new Date(value * 1000);
			var formatted = this.strPad("00", "" + (date.getMonth() + 1), true) + '/' + this.strPad("00", "" + date.getDate(), true) + '/' + date.getFullYear() + ' - ' + this.strPad("00", "" + date.getHours(), true) + ':' + this.strPad("00", "" + date.getMinutes(), true) + ':' + this.strPad("00", "" + date.getSeconds(), true);
			return formatted;
		}
	}

	strPad(pad: string, str: string, padLeft: boolean) {
		if (typeof str === 'undefined') {
			return pad;
		}

		if (padLeft) {
			return (pad + str).slice(-pad.length);
		} else {
			return (str + pad).substring(0, pad.length);
		}
	}

}