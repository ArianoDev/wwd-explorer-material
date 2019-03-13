import { Injectable } from '@angular/core';
import * as WorldWind from '@nasaworldwind/worldwind';

/**
 * The Formatter utiltity provides convienient methods for obtaining pretty strings.
 * Based on Bruce Schubert js implementation.
 */
@Injectable({
    providedIn: 'root'
})
export class Formatter {

    private DEG_TO_RAD = Math.PI / 180;

    /**
     * Returns a number formatted as decimal degrees: [+/-]DD.DDDD°.
     * @param num The value to be formatted.
     * @param decimals The number decimal places.
     * @returns The number formatted as decimal degrees.
     */
    formatDecimalDegrees(num, decimals) {
        return num.toFixed(decimals) + '\u00b0';
    }

    /**
     * Returns a number formatted as decimal minutes: [+/-]DD°MM.MMM'
     * @param  num The value to be formatted.
     * @param  decimals The number decimal places for minutes.
     * @returns  The number formatted as decimal degrees.
     */
    formatDecimalMinutes(num, decimals) {
        // Truncate degrees, keeping the sign.
        const degrees = Math.floor(num) + (num < 0 ? 1 : 0);
        const minutes = WorldWind.WWMath.fabs(num - degrees) * 60;
        return degrees + '\u00b0' + minutes.toFixed(decimals) + '\'';
    }
    /**
     * Returns a number formatted as degrees-minutes-seconds: [+/-]DD°MM'SS.SS'.
     * @param  num The value to be formatted.
     * @param  decimals The number decimal places for seconds.
     * @returns  The number formatted as decimal degrees.
     */
    formatDegreesMinutesSeconds(num, decimals) {
        // Truncate degrees, keeping the sign.
        const degrees = Math.floor(num) + (num < 0 ? 1 : 0);
        const minutesNum = WorldWind.WWMath.fabs(num - degrees) * 60;
        const minutesInt = Math.floor(minutesNum);
        const seconds = WorldWind.WWMath.fabs(minutesNum - minutesInt) * 60;
        return degrees + '\u00b0' + minutesInt + '\'' + seconds.toFixed(decimals) + '\'';
    }
    /**
     * Returns a number formatted as decimal degrees latitude: DD.DDDD°[N/S].
     * @param  latitude The value to be formatted.
     * @param  decimals The number decimal places.
     * @returns  The number formatted as decimal degrees latitude.
     */
    formatDecimalDegreesLat(latitude, decimals) {
        const num = WorldWind.WWMath.fabs(latitude);
        return this.formatDecimalDegrees(num, decimals) + (latitude >= 0 ? 'N' : 'S');
    }
    /**
     * Returns a number formatted as decimal degrees longitude: DD.DDDD°[E/W].
     * @param  longitude The value to be formatted.
     * @param  decimals The number decimal places.
     * @returns  The number formatted as decimal degrees longitude.
     */
    formatDecimalDegreesLon(longitude, decimals) {
        const num = WorldWind.WWMath.fabs(longitude);
        return this.formatDecimalDegrees(num, decimals) + (longitude >= 0 ? 'E' : 'W');
    }
    /**
     * Returns a number formatted as decimal minutes latitude: DD°MM.MMM[N/S].
     * @param  latitude The value to be formatted.
     * @param  decimals The number decimal places.
     * @returns  The number formatted as decimal degrees latitude.
     */
    formatDecimalMinutesLat(latitude, decimals) {
        const num = WorldWind.WWMath.fabs(latitude);
        return this.formatDecimalMinutes(num, decimals) + (latitude >= 0 ? 'N' : 'S');
    }
    /**
     * Returns a number formatted as decimal minutes longitude: DD°MM.MMM'[E/W].
     * @param  longitude The value to be formatted.
     * @param  decimals The number decimal places.
     * @returns  The number formatted as decimal degrees longitude.
     */
    formatDecimalMinutesLon(longitude, decimals) {
        const num = WorldWind.WWMath.fabs(longitude);
        return this.formatDecimalMinutes(num, decimals) + (longitude >= 0 ? 'E' : 'W');
    }
    /**
     * Returns a number formatted as degrees, minutes, seconds latiude: DD°[N/S].
     * @param  latitude The value to be formatted.
     * @param  decimals The number decimal places.
     * @returns  The number formatted as decimal degrees longitude.
     */
    formatDMSLatitude(latitude, decimals) {
        const num = WorldWind.WWMath.fabs(latitude);
        return this.formatDegreesMinutesSeconds(num, decimals) + (latitude >= 0 ? 'N' : 'S');
    }
    /**
     * Returns a number formatted as degrees, minutes, seconds longitude: DD°[E/W].
     * @param  longitude The value to be formatted.
     * @param  decimals The number decimal places.
     * @returns  The number formatted as decimal degrees longitude.
     */
    formatDMSLongitude(longitude, decimals) {
        const num = WorldWind.WWMath.fabs(longitude);
        return this.formatDegreesMinutesSeconds(num, decimals) + (longitude >= 0 ? 'E' : 'W');
    }
    /**
     * Returns a number formatted as degrees: DD.DDD°
     * @param  angle The value to be formatted.
     * @param  decimals The number decimal places.
     * @returns  The number formatted as decimal degrees.
     */
    formatAngle360(angle, decimals) {
        while (angle < 0) {
            angle += 360;
        }
        while (angle >= 360) {
            angle -= 360;
        }
        return angle.toFixed(decimals) + '\u00b0';
    }
    /**
     * Returns a number formatted as +/- 180 degrees: DD.DDD°
     * @param  angle The value to be formatted.
     * @param  decimals The number decimal places.
     * @returns  The number formatted as +/- decimal degrees.
     */
    formatAngle180(angle, decimals) {
        while (angle > 180) {
            angle -= 360;
        }
        while (angle < -180) {
            angle += 360;
        }
        return angle.toFixed(decimals) + '\u00b0';
    }
    /**
     * Format an altitude with a units suffix.
     * @param  altitude Meters.
     * @param  units Optional.
     * @returns  Formatted string with units.
     */
    formatAltitude(altitude, units) {
        // Convert from meters to the desired units format.
        if (units === 'km') {
            altitude /= 1e3;
        } else if (units === 'ft') {
            altitude *= 3.28084;
        }
        // Round to the nearest integer and place a comma every three digits. See the following Stack Overflow thread
        // for more information:
        // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        return altitude.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ' + units;

    }
    formatDayOfMonthTime(datetime, locale) {
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        const dateOptions = {
            day: '2-digit'
        };

        return datetime.toLocaleDateString(locale || 'en', dateOptions)
            + ' ' + datetime.toLocaleTimeString(locale || 'en', timeOptions);
    }
    /**
     * Formats an angle to slope as a percent of slope.
     * @returns  Formatted string with % sign.
     */
    formatPercentSlope(angle, decimals) {
        while (angle < 0) {
            angle += 360;
        }
        while (angle >= 360) {
            angle -= 360;
        }
        const percent = Math.tan(angle * this.DEG_TO_RAD) * 100;
        return percent.toFixed(decimals) + '%';
    }
}
