import { createAxiosInstance } from "lib/axios";

const MEETING_URL = "meetings";
const RESPONSES_URL = "responses";

type DataBaseObject = {
  _id: string;
  _createdOn: string;
  _modifiedAt: string;
};

type ApplicationObject = {
  id: DataBaseObject["_id"];
  createdOn: DataBaseObject["_createdOn"];
  modifiedAt: DataBaseObject["_modifiedAt"];
};

type DatabaseMeeting = DataBaseObject & {
  title: string;
  creator: string;
  creatorEmail: string;
  dates: string[];
};

type NewMeeting = Omit<DatabaseMeeting, keyof DataBaseObject>;

type ApplicationMeeting = Omit<DatabaseMeeting, keyof DataBaseObject> &
  ApplicationObject;

type DatabaseMeetingResponse = DataBaseObject & {
  name: string;
  dates: string[];
  meetingId: DataBaseObject["_id"];
};

type NewMeetingResponse = Omit<DatabaseMeetingResponse, keyof DataBaseObject>;

type ApplicationMeetingResponse = Omit<
  DatabaseMeetingResponse,
  keyof DataBaseObject
> &
  ApplicationObject;

function transformBackendObject(data: DataBaseObject): ApplicationObject;
function transformBackendObject(data: DataBaseObject[]): ApplicationObject[];
function transformBackendObject(data: DataBaseObject | DataBaseObject[]) {
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
    .post<DatabaseMeeting>(MEETING_URL, meeting)
    .then(({ data }) => {
      return transformBackendObject(data) as ApplicationMeeting;
    })
    .catch((error) => {
      throw error;
    });
};

export const createMeetingResponse = (meetingResponse: NewMeetingResponse) => {
  return axios
    .post<DatabaseMeetingResponse>(RESPONSES_URL, meetingResponse)
    .then(({ data }) => {
      return transformBackendObject(data) as ApplicationMeetingResponse;
    })
    .catch((error) => {
      throw error;
    });
};

export const getMeeting = (id: string) => {
  return axios
    .get<DatabaseMeeting>(MEETING_URL + `/${id}`)
    .then(({ data }) => {
      return transformBackendObject(data) as ApplicationMeeting;
    })
    .catch((error) => {
      throw error;
    });
};

export const getMeetingResponse = (meetingId: string) => {
  return axios
    .get<DatabaseMeetingResponse[]>(RESPONSES_URL, {
      params: {
        q: `meetingId:${meetingId}`,
      },
    })
    .then(({ data }) => {
      return transformBackendObject(data) as ApplicationMeetingResponse[];
    })
    .catch((error) => {
      throw error;
    });
};
