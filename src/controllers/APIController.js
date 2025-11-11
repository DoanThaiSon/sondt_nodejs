import pool from '../config/database.js';

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Users');
    return res.status(200).json({
      message: 'ok',
      data: rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const { email, name, city } = req.body;

    if (!email || !name || !city) {
      return res.status(200).json({ message: 'Missing required params' });
    }

    await pool.execute(
      'INSERT INTO Users (email, name, city) VALUES (?, ?, ?)',
      [email, name, city]
    );

    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, name, city, id } = req.body;

    if (!email || !name || !city || !id) {
      return res.status(200).json({ message: 'Missing required params' });
    }

    await pool.execute(
      'UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?',
      [email, name, city, id]
    );

    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({ message: 'Missing required params' });
    }

    await pool.execute('DELETE FROM Users WHERE id = ?', [userId]);

    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error', error: error.message });
  }
};
