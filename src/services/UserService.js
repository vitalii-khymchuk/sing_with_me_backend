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
    return await User.findOneAndUpdate({ email }, { token: null });
  }

  async getHistory(email) {
    const [{ history }] = await User.find({ email });
    return history;
  }

  async getSaved(email) {
    const [{ saved }] = await User.find({ email });
    return saved;
  }

  async addToHistory(email, results, query) {
    const maxHistoryItems = 20;
    const [{ history, _id }] = await User.find({ email });
    const historyItem = {
      query: query ?? results[0].full_title,
      thumb: results[0].header_image_thumbnail_url,
      hits: results,
    };
    history.unshift(historyItem);

    if (history.length > maxHistoryItems) {
      history.splice(maxHistoryItems, history.length - maxHistoryItems);
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
    const filteredSaved = saved.filter(({ id }) => id !== itemId);
    await User.findByIdAndUpdate(_id, { saved: filteredSaved });
    return filteredSaved;
  }
}

module.exports = new UserService();
