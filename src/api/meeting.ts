import { createAxiosInstance } from "lib/axios";

const COLLECTION_URL = "meetings";

type DatabaseMeeting = {
  _id: string;
  title: string;
  creator: string;
  creatorEmail: string;
  dates: string[];
  _createdOn: string;
  _modifiedAt: string;
};

type NewMeeting = Omit<DatabaseMeeting, "_id" | "_createdOn" | "_modifiedAt">;

type ApplicationMeeting = Omit<
  DatabaseMeeting,
  "_id" | "_createdOn" | "_modifiedAt"
> & {
  id: DatabaseMeeting["_id"];
  createdOn: DatabaseMeeting["_createdOn"];
  modifiedAt: DatabaseMeeting["_modifiedAt"];
};

function transformBackendObject(data: DatabaseMeeting): ApplicationMeeting;
function transformBackendObject(data: DatabaseMeeting[]): ApplicationMeeting[];
function transformBackendObject(data: DatabaseMeeting | DatabaseMeeting[]) {
  if (Array.isArray(data)) {
    const transformedData = data.map(
      ({ _id, _createdOn, _modifiedAt, ...rest }) => {
        return {
          id: _id,
          createdOn: _createdOn,
          modifiedAt: _modifiedAt,
          ...rest,
        };
      }
    );

    return transformedData;
  }

  const { _id, _createdOn, _modifiedAt, ...rest } = data;

  return {
    id: _id,
    createdOn: _createdOn,
    modifiedAt: _modifiedAt,
    ...rest,
  };
}

const axios = createAxiosInstance();

export const createMeeting = (meeting: NewMeeting) => {
  return axios
    .post<DatabaseMeeting>(COLLECTION_URL, meeting)
    .then(({ data }) => {
      return transformBackendObject(data);
    })
    .catch((error) => {
      throw error;
    });
};

export const getMeeting = (id: string) => {
  return axios
    .get<DatabaseMeeting>(COLLECTION_URL + `/${id}`)
    .then(({ data }) => {
      return transformBackendObject(data);
    })
    .catch((error) => {
      throw error;
    });
};
