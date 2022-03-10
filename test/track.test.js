const supertest = require('supertest');
const app = require('../src/app');
const { trackToCreate, trackKeys } = require('./testsData');

describe('🎧 TRACKS ROUTES', () => {
  const persistentDatas = {};

  it('should get the track list 🧪 /api/track', async () => {
    const res = await supertest(app)
      .get('/api/track')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((track) => {
      trackKeys.map((prop) => {
        expect(track).toHaveProperty(prop);
      });
    });
  });

  it('should get the track with id 1 🧪 /api/track/1', async () => {
    const res = await supertest(app)
      .get('/api/track/1')
      .expect(200)
      .expect('Content-Type', /json/);

    trackKeys.map((prop) => {
      expect(res.body).toHaveProperty(prop);
    });
  });

  it('should create a new track 🧪 /api/track', async () => {
    const res = await supertest(app)
      .post('/api/track')
      .send(trackToCreate)
      .expect(201)
      .expect('Content-Type', /json/);

    trackKeys.map((prop) => {
      expect(res.body).toHaveProperty(prop);
    });

    persistentDatas.createdAlbum = res.body;
  });

  it(`should update the created track title 🧪 /api/track/`, async () => {
    await supertest(app)
      .put(`/api/track/${persistentDatas.createdAlbum.id}`)
      .send({
        title: 'Bohemian Rhapsody',
      })
      .expect(204);

    const res = await supertest(app).get(
      `/api/track/${persistentDatas.createdAlbum.id}`
    );

    expect(res.body).toHaveProperty('title', 'Bohemian Rhapsody');
  });

  it(`should delete the created album 🧪 /api/track/`, async () => {
    await supertest(app)
      .delete(`/api/track/${persistentDatas.createdAlbum.id}`)
      .expect(204);

    await supertest(app)
      .get(`/api/track/${persistentDatas.createdAlbum.id}`)
      .expect(404);
  });
});
