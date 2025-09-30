import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseAsync('Doodle-Haven.db');
// creates a database instance using the SQLite library

export default database;