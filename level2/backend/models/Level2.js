var mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const level2schema = new Schema(
  {
    currency: {
      type: String
    },
    symbol: {
      type: String
    },
    logo_url: {
      type: String
    },
    rank: {
      type: String
    },
    price: {
      type: String
    },
    price_date: {
      type: String
    },
    market_cap: {
      type: String
    },
    circulating_supply: {
      type: String
    },
    max_supply: {
      type: String
    },
    high: {
      type: String
    },
    high_timestamp: {
      type: String
    },
    '1d': {
      price_change: {
        type: String
      },
      price_change_pct: {
        type: String
      },
      volume: {
        type: String
      },
      volume_change: {
        type: String
      },
      volume_change_pct: {
        type: String
      },
      market_cap_change: {
        type: String
      },
      market_cap_change_pct: {
        type: String
      }
    },
    '7d': {
      price_change: {
        type: String
      },
      price_change_pct: {
        type: String
      },
      volume: {
        type: String
      },
      volume_change: {
        type: String
      },
      volume_change_pct: {
        type: String
      },
      market_cap_change: {
        type: String
      },
      market_cap_change_pct: {
        type: String
      }
    },
    '30d': {
      price_change: {
        type: String
      },
      price_chage_pct: {
        type: String
      },
      volume: {
        type: String
      },
      volume_change: {
        type: String
      },
      volume_change_pct: {
        type: String
      },
      market_cap_change: {
        type: String
      },
      market_cap_change_pct: {
        type: String
      }
    },
    '365d': {
      price_change: {
        type: String
      },
      price_chage_pct: {
        type: String
      },
      volume: {
        type: String
      },
      volume_change: {
        type: String
      },
      volume_change_pct: {
        type: String
      },
      market_cap_change: {
        type: String
      },
      market_cap_change_pct: {
        type: String
      }
    }
  },
  {
    versionKey: false,
    timestamps: false
  }
);

const user = mongoose.model("Level2", level2schema);
module.exports = user;
