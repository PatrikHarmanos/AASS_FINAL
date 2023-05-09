<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    /**
     * Override fillable property data.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
    ];

    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'course_tasks')->using(CourseTasks::class)->withTimestamps();
    }
}
