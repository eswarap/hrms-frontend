/**
 * @typedef {Object} User
 * @property {string[]} authorities - The user's authorities/roles

 */

/**
 * Creates a user object with default values for missing fields
 * @param {Partial<User>} userData - Partial user data from API
 * @returns {User} Complete user object
 */
export function createUserObject(userData) {
    return {
        authorities: userData.authorities || []
    };
}