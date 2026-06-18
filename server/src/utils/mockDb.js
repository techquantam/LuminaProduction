const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class MockCollection {
  constructor(name, defaultData = []) {
    this.filePath = path.join(DATA_DIR, `${name}.json`);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify(defaultData, null, 2));
    }
  }

  read() {
    try {
      const content = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(content);
    } catch (e) {
      return [];
    }
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  find(query = {}) {
    let items = this.read();
    return items.filter(item => {
      for (let key in query) {
        if (query[key] !== undefined && item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  findOne(query = {}) {
    const items = this.find(query);
    return items.length > 0 ? items[0] : null;
  }

  findById(id) {
    return this.findOne({ _id: id });
  }

  create(data) {
    const items = this.read();
    const newItem = {
      _id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    items.push(newItem);
    this.write(items);
    return newItem;
  }

  findByIdAndUpdate(id, data, options = {}) {
    const items = this.read();
    const index = items.findIndex(item => item._id === id);
    if (index === -1) return null;
    
    items[index] = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    this.write(items);
    return items[index];
  }

  findByIdAndDelete(id) {
    const items = this.read();
    const index = items.findIndex(item => item._id === id);
    if (index === -1) return null;
    
    const deleted = items.splice(index, 1)[0];
    this.write(items);
    return deleted;
  }
}

// Instantiate mock collections
const mockCollections = {
  Admin: new MockCollection('admins', []),
  Project: new MockCollection('projects', []),
  Service: new MockCollection('services', []),
  Testimonial: new MockCollection('testimonials', []),
  Gallery: new MockCollection('gallery', []),
  Contact: new MockCollection('contacts', []),
  Client: new MockCollection('clients', []),
  TeamMember: new MockCollection('team', [])
};

module.exports = mockCollections;
