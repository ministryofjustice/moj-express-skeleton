'use strict';

/**
 * Check if the cookies policy is already set.
 * @returns {boolean} True if the cookies policy is set, false otherwise.
 */
export function isCookiesPolicySet() {
    return document.cookie
        .split(';')
        .some((item) => item.trim().startsWith('cookies_policy='));
}

/**
 * Set the cookies policy.
 * @param {Object} policy - The policy object.
 * @param {string} policy.analytics - The analytics cookie policy.
 * @param {string} policy.functional - The functional cookie policy.
 */
export function setCookiesPolicy(policy) {
    document.cookie = `cookies_policy=${JSON.stringify(policy)}; max-age=31557600; path=/; secure; samesite=lax`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (!isCookiesPolicySet()) {
        const cookieBanner = document.getElementById('cookie-banner');
        const defaultMessage = document.getElementById('default-message');
        const acceptedMessage = document.getElementById('accepted-message');
        const rejectedMessage = document.getElementById('rejected-message');

        /**
         * Accept additional cookies.
         */
        const acceptCookies = () => {
            setCookiesPolicy({ analytics: 'yes', functional: 'yes' });
            defaultMessage.hidden = true;
            acceptedMessage.hidden = false;
            cookieBanner.hidden = true;
        };

        /**
         * Reject additional cookies.
         */
        const rejectCookies = () => {
            setCookiesPolicy({ analytics: 'no', functional: 'no' });
            defaultMessage.hidden = true;
            rejectedMessage.hidden = false;
        };

        /**
         * Hide the accepted message.
         */
        const hideAcceptedMessage = () => {
            acceptedMessage.hidden = true;
            cookieBanner.hidden = true;
        };

        /**
         * Hide the rejected message.
         */
        const hideRejectedMessage = () => {
            rejectedMessage.hidden = true;
            cookieBanner.hidden = true;
        };

        document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
        document.getElementById('reject-cookies').addEventListener('click', rejectCookies);
        document.getElementById('accepted-hide').addEventListener('click', hideAcceptedMessage);
        document.getElementById('rejected-hide').addEventListener('click', hideRejectedMessage);
    }
});