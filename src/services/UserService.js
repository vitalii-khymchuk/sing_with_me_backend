const { User } = require("@models");

class UserService {
  async signInWithGoogle(userData) {
    let [user] = await User.find({ email: userData.email });
    if (!user) {
      user = await User.create(userData);
    } else {
      user = await User.findByIdAndUpdate(user._id, { token: userData.token });
    }
    return { ...user };
  }

  async logout(email) {
    await User.findOneAndUpdate({ email }, { token: null });
  }

  async getHistory(email) {
    const [{ history }] = await User.find({ email });
    return history;
  }

  async getSaved(email) {
    const [{ saved }] = await User.find({ email });
    return saved;
  }

  async addToHistory(email, item) {
    const maxHistoryItems = 20;
    const [{ history, _id }] = await User.find({ email });
    history.unshift(item);
    if (history.length > maxHistoryItems) {
      history.splice(maxHistoryItems, arr.length - maxHistoryItems);
    }
    await User.findByIdAndUpdate(_id, { history });
    return history;
  }

  async addToSaved(email, item) {
    const [{ saved, _id }] = await User.find({ email });
    saved.unshift(item);
    await User.findByIdAndUpdate(_id, { saved });
    return saved;
  }

  async removeFromSaved(email, itemId) {
    const [{ saved, _id }] = await User.find({ email });
    saved = saved.filter(({ _id }) => _id !== itemId);
    await User.findByIdAndUpdate(_id, { saved });
    return saved;
  }
}

module.exports = new UserService();
