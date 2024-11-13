import {useState} from 'react';
import SQLite, {SQLiteDatabase, ResultSet} from 'react-native-sqlite-storage';
import {Location} from '../../screens/home/HomeModel';

interface InputViewModel {
  isDbLoading: boolean;
  saveSearch: (location: Location) => Promise<void>;
}

const useInputViewModel = (): InputViewModel => {
  const [isDbLoading, setIsDbLoading] = useState<boolean>(false);

  const db: SQLiteDatabase = SQLite.openDatabase(
    {name: 'searchResults', location: 'default'},
    () => console.log('Database connected!'),
    (error: Error) => console.log('Database error:', error),
  );

  const saveSearch = async ({latitude, longitude}: Location): Promise<void> => {
    setIsDbLoading(true);
    const sql = 'INSERT INTO searchData (lat, long) VALUES (?, ?)';
    const params = [latitude, longitude];

    try {
      db.executeSql(
        sql,
        params,
        (result: ResultSet) => {
          setIsDbLoading(false);
          console.log('Data added successfully', result);
        },
        (error: Error) => {
          setIsDbLoading(false);
          console.log('Error adding data:', error);
        },
      );
    } catch (error) {
      setIsDbLoading(false);
      console.error('Database execution error:', error);
    }
  };

  return {
    isDbLoading,
    saveSearch,
  };
};

export default useInputViewModel;
